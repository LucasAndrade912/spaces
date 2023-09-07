import { Request, Response } from 'express';

import { Middleware } from '@/contracts/middleware';
import { ExpressAdapter } from '@/http/express/server';
import { CreateSpaceController } from '@/http/express/controllers/spaces/createSpace';
import { GetUserSpacesController } from '@/http/express/controllers/spaces/getUserSpaces';

export function loadSpaceRoutes(server: ExpressAdapter, middlewares: Middleware<Request, Response>[]) {
	server.createRoute({
		route: '/spaces',
		method: 'GET',
		controller: new GetUserSpacesController(),
		middlewares: [...middlewares]
	});

	server.createRoute({
		route: '/spaces',
		method: 'POST',
		controller: new CreateSpaceController(),
		middlewares: [...middlewares]
	});
}
