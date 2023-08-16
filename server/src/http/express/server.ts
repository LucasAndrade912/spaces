import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import { Route } from '@/contracts/route';
import { HttpServer } from '@/contracts/httpServer';

export class ExpressAdapter extends HttpServer {
	private app: Express;

	constructor (protected readonly port: number) {
		super(port);
		this.app = express();
		this.app.use(cookieParser());
		this.app.use(cors({
			credentials: true,
			origin: process.env.FRONT_END_ORIGIN
		}));
		this.app.use(express.json());
	}

	createRoute({ route, method, controller, middlewares }: Route<Request, Response>): void {
		if (middlewares && middlewares.length > 0) {
			middlewares.forEach(middleware => {
				this.app.use((req, res, next) => middleware.handler(req, res, next));
			});
		}

		const methods = {
			'GET': () => {
				this.app.get(route, (req, res) => controller.handler(req, res));
			},
			'POST': () => {
				this.app.post(route, (req, res) => controller.handler(req, res));
			},
			'PUT': () => {
				this.app.put(route, (req, res) => controller.handler(req, res));
			},
			'PATCH': () => {
				this.app.patch(route, (req, res) => controller.handler(req, res));
			},
			'DELETE': () => {
				this.app.delete(route, (req, res) => controller.handler(req, res));
			},
		};

		methods[method]();
	}

	start(callback?: () => void) {
		this.app.listen(this.port, callback);
	}
}
