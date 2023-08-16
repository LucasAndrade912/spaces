import { Request, Response } from 'express';

import { Controller } from '@/contracts/controller';
import { GetUserData } from '@/useCases/getUserData';
import { UserRepositorySql } from '@/repositories/sql/userRepositorySql';

export class GetUserDataController implements Controller<Request, Response> {
	async handler(request: Request, response: Response) {
		const userRepository = new UserRepositorySql();
		const getUserDataUseCase = new GetUserData(userRepository);

		const user = await getUserDataUseCase.execute({
			id: String(response.locals.user)
		});

		response.json({ user });
	};
}
