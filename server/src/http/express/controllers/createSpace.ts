import { Request, Response } from 'express';

import { Controller } from '@/contracts/controller';
import { CreateSpace } from '@/useCases/createSpace';
import { UserRepositorySql } from '@/repositories/sql/userRepositorySql';
import { SpaceRepositorySql } from '@/repositories/sql/spaceRepositorySql';

export class CreateSpaceController implements Controller<Request, Response> {
	async handler(request: Request, response: Response) {
		const userRepository = new UserRepositorySql();
		const spaceRepository = new SpaceRepositorySql();
		const createSpaceUseCase = new CreateSpace(userRepository, spaceRepository);

		const { name, participants } = request.body;

		await createSpaceUseCase.execute({
			userId: String(response.locals.user),
			space: { name, participants }
		});

		response.status(201).send();
	};
}
