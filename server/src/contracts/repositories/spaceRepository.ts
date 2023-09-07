import { Space } from '@/entities/Space';

type Participant = {
	id: string;
	permission: 'read' | 'edit';
}

type SpaceWithoutOwner = Omit<Space, 'owner'>;
type SpaceWithoutParticipants = Omit<SpaceWithoutOwner, 'participants'>;
type SpaceWithoutCreatedAt = Omit<SpaceWithoutParticipants, 'createdAt'>;
export type FindAllSpaces = Array<SpaceWithoutCreatedAt & { id: string }>;

interface InputCreateSpace {
	name: string;
	owner: string;
	participants: Participant[];
}

export interface SpaceRepository {
	create(space: InputCreateSpace): Promise<void>;
	findAll(userId: string): Promise<FindAllSpaces>;
}
