import { SpaceRepository } from '@/contracts/repositories/spaceRepository';

interface Input {
	userId: string;
}

export class GetUserSpaces {
	constructor(
		private readonly spaceRepository: SpaceRepository
	) {}

	async execute({ userId }: Input) {
		const spaces = await this.spaceRepository.findAll(userId);

		return spaces;
	}
}
