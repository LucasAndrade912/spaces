import { UserRepository } from '@/contracts/repositories/userRepository';

import { EmptyEmailError } from './errors';

interface Input {
	email: string;
}

export class SuggestParticipatEmail {
	constructor (private readonly userRepository: UserRepository) {}

	async execute({ email }: Input) {
		if (email.length === 0) {
			throw new EmptyEmailError();
		}

		const user = await this.userRepository.searchByEmail(email.toLowerCase());

		return user;
	}
}
