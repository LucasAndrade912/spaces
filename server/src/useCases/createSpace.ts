import { SpaceRepository } from '@/contracts/repositories/spaceRepository';
import { UserRepository } from '@/contracts/repositories/userRepository';

interface Input {
	userId: string;
	space: {
		name: string;
		participantsEmails: string[];
	}
}

export class CreateSpace {
	constructor(
		private readonly userRepository: UserRepository,
		private readonly spaceRepository: SpaceRepository
	) {}

	async execute({ userId, space }: Input) {
		const user = await this.userRepository.findUnique(userId);

		if (user) {
			const { name, participantsEmails } = space;

			const findParticipantsQueries = participantsEmails.map(participant => this.userRepository.findByEmail(participant));
			const foundParticipants = await Promise.all(findParticipantsQueries);

			const foundParticipantsIds = foundParticipants
				.filter(participant => {
					return participant !== null;
				})
				.map(participant => participant!.id);

			await this.spaceRepository.create({
				name,
				owner: user.id,
				participants: foundParticipantsIds
			});
		}
	}
}
