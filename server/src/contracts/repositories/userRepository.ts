import { User } from '@/entities/User';

export interface UserRepository {
	findUnique: (id: string) => Promise<User | null>;
	findByEmail: (email: string) => Promise<User | null>;
	searchByEmail: (email: string) => Promise<{ email: string, avatar: string } | null>;
	create: (user: Omit<User, 'id'>) => Promise<User | null>;
}
