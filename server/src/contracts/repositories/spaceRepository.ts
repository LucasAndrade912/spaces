type Participant = {
	id: string;
	permission: 'read' | 'edit';
}

interface InputCreateSpace {
	name: string;
	owner: string;
	participants: Participant[];
}

export interface SpaceRepository {
	create(space: InputCreateSpace): Promise<void>;
}
