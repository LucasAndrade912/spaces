import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { Middleware } from '@/contracts/middleware';

export class AuthMiddleware implements Middleware<Request, Response> {
	async handler(request: Request, response: Response, next: () => void) {
		const { token } = request.cookies;

		if (!token) {
			return response.status(401).send();
		}

		try {
			const { sub } = jwt.verify(token, process.env.JWT_SECRET as string);
			response.locals.user = sub as string;
			next();
		} catch {
			response.status(401).send();
			return;
		}
	}
}
