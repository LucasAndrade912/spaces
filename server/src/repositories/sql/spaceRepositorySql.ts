import { prisma } from '@/lib/prisma';
import { Space } from '@/entities/Space';
import { SpaceRepository } from '@/contracts/repositories/spaceRepository';

export class SpaceRepositorySql implements SpaceRepository {
	async create(space: Space): Promise<void> {
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
								userId: participant
							};
						})
					}
				}
			}
		});
	}
}
