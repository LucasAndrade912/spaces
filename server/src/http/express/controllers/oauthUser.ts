import { Request, Response } from 'express';

import { OAuthUser } from '@/useCases/oauthUser';
import { Controller } from '@/contracts/controller';
import { UserRepositorySql } from '@/repositories/sql/userRepositorySql';

export class OAuthUserController implements Controller<Request, Response> {
	async handler(request: Request, response: Response) {
		const userRepository = new UserRepositorySql();
		const oauthUserUseCase = new OAuthUser(userRepository);

		const code = request.query.code as string;
		const path = request.query.state as string;

		const { success, token } = await oauthUserUseCase.execute({ code });

		if (!success) {
			response.status(401).send();
			return;
		}

		const cookieMaxAge = 1000 * 60 * 60 * 24 * 30; // 30 days

		response
			.cookie('token', token, {
				maxAge: cookieMaxAge,
				httpOnly: true
			})
			.redirect(`${process.env.FRONT_END_ORIGIN}${path}`);
	};
}
