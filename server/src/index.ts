import 'dotenv/config';

import { ExpressAdapter } from '@/http/express/server';
import { AuthMiddleware } from '@/http/express/middlewares/authMiddleware';
import { OAuthUserController } from '@/http/express/controllers/oauthUser';
import { GetUserDataController } from '@/http/express/controllers/getUserData';
import { CreateSpaceController } from './http/express/controllers/createSpace';
import { SuggestParticipatEmailController } from './http/express/controllers/suggestParticipantEmail';

const PORT = Number(process.env.PORT) || 3000;
const server = new ExpressAdapter(PORT);

const authMiddleware = new AuthMiddleware();

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
	route: '/spaces',
	method: 'POST',
	controller: new CreateSpaceController(),
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
