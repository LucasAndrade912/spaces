import 'dotenv/config';

import { ExpressAdapter } from '@/http/express/server';
import { AuthMiddleware } from '@/http/express/middlewares/authMiddleware';
import { OAuthUserController } from '@/http/express/controllers/oauthUser';
import { GetUserDataController } from '@/http/express/controllers/getUserData';
import { SuggestParticipatEmailController } from './http/express/controllers/suggestParticipantEmail';

import { loadSpaceRoutes } from './routes/spacesRoutes';

const PORT = Number(process.env.PORT) || 3000;
const server = new ExpressAdapter(PORT);

const authMiddleware = new AuthMiddleware();

loadSpaceRoutes(server, [authMiddleware]);

server.createRoute({
	route: '/oauth',
	method: 'GET',
	controller: new OAuthUserController()
});

server.createRoute({
	route: '/me',
	method: 'GET',
	controller: new GetUserDataController(),
	middlewares: [authMiddleware]
});

server.createRoute({
	route: '/users/participant',
	method: 'GET',
	controller: new SuggestParticipatEmailController(),
	middlewares: [authMiddleware]
});

server.start(() => {
	console.log(`🚀 Server is running on localhost:${PORT}`);
});
