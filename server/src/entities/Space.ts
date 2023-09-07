type Participant = {
	email: string;
	permission: 'read' | 'edit';
}

export interface Space {
	name: string;
	owner: string;
	createdAt: Date;
	updatedAt: Date;
	participants: Participant[];
}
