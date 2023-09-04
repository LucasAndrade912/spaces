import { Request, Response } from 'express';

import { Controller } from '@/contracts/controller';
import { UserRepositorySql } from '@/repositories/sql/userRepositorySql';
import { SuggestParticipatEmail } from '@/useCases/suggestParticipantEmail';

import { EmptyEmailError } from '@/useCases/suggestParticipantEmail/errors';

export class SuggestParticipatEmailController implements Controller<Request, Response> {
	async handler(request: Request, response: Response) {
		const email = request.query.email as string;

		const userRepository = new UserRepositorySql();
		const suggestParticipatEmailUseCase = new SuggestParticipatEmail(userRepository);

		try {
			const user = await suggestParticipatEmailUseCase.execute({ email });

			if (!user) {
				response.status(404).json({ message: 'Participat email not found' });
				return;
			}

			response.status(200).json({
				message: 'Participant found successfully',
				user: {
					email: user.email,
					avatar: user.avatar
				}
			});
		} catch (error) {
			if (error instanceof EmptyEmailError) {
				response.status(400).json({ message: error.message });
			}
		}
	};
}
