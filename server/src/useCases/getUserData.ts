import { User } from '@/entities/User';
import { UserRepository } from '@/contracts/repositories/userRepository';

interface Input {
	id: string
}

export class GetUserData {
	constructor (private readonly repository: UserRepository) {}

	async execute({ id }: Input): Promise<User | null> {
		const user = await this.repository.findUnique(id);
		return user;
	}
}
