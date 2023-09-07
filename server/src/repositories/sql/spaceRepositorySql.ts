import { prisma } from '@/lib/prisma';
import { SpaceRepository, FindAllSpaces } from '@/contracts/repositories/spaceRepository';

interface InputCreateSpace {
	name: string;
	owner: string;
	participants: {
		id: string;
		permission: 'read' | 'edit';
	}[];
}

export class SpaceRepositorySql implements SpaceRepository {
	async create(space: InputCreateSpace): Promise<void> {
		await prisma.space.create({
			data: {
				title: space.name,
				owner: {
					connect: {
						id: space.owner
					}
				},
				sharedUsersOnSpaces: {
					createMany: {
						data: space.participants.map(participant => {
							return {
								userId: participant.id,
								isEditor: participant.permission === 'edit'
							};
						})
					}
				}
			}
		});
	}

	async findAll(userId: string): Promise<FindAllSpaces> {
		const spaces = await prisma.space.findMany({
			where: {
				ownerId: userId
			},
			select: {
				id: true,
				title: true,
				updatedAt: true,
				createdAt: false,
				ownerId: false,
			}
		});

		return spaces.map(space => ({
			id: space.id,
			name: space.title,
			updatedAt: space.updatedAt,
		}));
	}
}
