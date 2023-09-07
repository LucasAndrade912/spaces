import { UserRepository } from '@/contracts/repositories/userRepository';
import { SpaceRepository } from '@/contracts/repositories/spaceRepository';

type Participant = {
	email: string;
	permission: 'read' | 'edit';
}

interface Input {
	userId: string;
	space: {
		name: string;
		participants: Participant[];
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
			const { name, participants } = space;

			const getParticipantsData = async () => {
				return Promise.all(participants.map(async (participant) => {
					if (participant) {
						const foundUser = await this.userRepository.findByEmail(participant.email);

						if (foundUser) return { id: foundUser!.id, permission: participant.permission };
					}
				}));
			};

			type ParticipantData = Omit<Participant, 'email'> & { id: string };
			const participantsData = (await getParticipantsData()).filter(participant => participant) as ParticipantData[];

			await this.spaceRepository.create({
				name,
				owner: user.id,
				participants: participantsData
			});
		}
	}
}
