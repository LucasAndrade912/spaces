import { Space } from '@/entities/Space';

export interface SpaceRepository {
	create(space: Space): Promise<void>;
}
