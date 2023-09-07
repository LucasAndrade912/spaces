import { Request, Response } from 'express';

import { Controller } from '@/contracts/controller';
import { GetUserSpaces } from '@/useCases/spaces/getUserSpaces';
import { SpaceRepositorySql } from '@/repositories/sql/spaceRepositorySql';

export class GetUserSpacesController implements Controller<Request, Response> {
	async handler(request: Request, response: Response) {
		const spaceRepository = new SpaceRepositorySql();
		const getUserSpacesUseCase = new GetUserSpaces(spaceRepository);

		const spaces = await getUserSpacesUseCase.execute({
			userId: String(response.locals.user)
		});

		response.status(200).json({ spaces });
	};
}
