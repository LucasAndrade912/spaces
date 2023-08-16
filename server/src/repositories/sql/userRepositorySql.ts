import { User } from '@/entities/User';
import { prisma } from '@/lib/prisma';
import { UserRepository } from '@/contracts/repositories/userRepository';

export class UserRepositorySql implements UserRepository {
	async findUnique(id: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: { id }
		});

		if (!user) return null;

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar: user.profilePicture || ''
		};
	};

	async findByEmail(email: string): Promise<User | null> {
		const user = await prisma.user.findUnique({
			where: { email }
		});

		if (!user) return null;

		return {
			id: user.id,
			name: user.name,
			email: user.email,
			avatar: user.profilePicture || ''
		};
	}

	async create(user: Omit<User, 'id'>): Promise<User | null> {
		const newUser = await prisma.user.create({
			data: {
				name: user.name,
				email: user.email,
				profilePicture: user.avatar
			}
		});

		if (!newUser) return null;

		return {
			id: newUser.id,
			name: newUser.name,
			email: newUser.email,
			avatar: newUser.profilePicture || '',
		};
	};
}
