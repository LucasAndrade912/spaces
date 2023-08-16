import axios from 'axios';
import jwt from 'jsonwebtoken';

import { UserRepository } from '@/contracts/repositories/userRepository';

interface Input {
	code: string;
}

interface Output {
	success: boolean;
	token?: string;
}

export class OAuthUser {
	constructor(private readonly userRepository: UserRepository) {}

	async execute({ code }: Input): Promise<Output> {
		const rootUrl = 'https://oauth2.googleapis.com/token';

		if (!code) {
			return { success: false };
		}

		const options = {
			code,
			client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
			client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
			redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT,
			grant_type: 'authorization_code'
		};

		const { data: { access_token } } = await axios.post(
			rootUrl,
			options,
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			}
		);

		const { data: userInfo } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);

		let user = await this.userRepository.findByEmail(userInfo.email);

		if (!user) {
			user = await this.userRepository.create({
				name: userInfo.name,
				email: userInfo.email,
				avatar: userInfo.picture
			});
		}

		const token = jwt.sign(
			{
				name: user?.name,
				email: user?.email
			},
			process.env.JWT_SECRET as string,
			{
				subject: user?.id,
				expiresIn: '30d'
			}
		);

		return { success: true, token };
	}
}
