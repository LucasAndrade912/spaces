import { Controller } from './controller';
import { Middleware } from './middleware';

export interface Route<Request = unknown, Response = unknown> {
	route: string
	method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
	controller: Controller<Request, Response>
	middlewares?: Middleware<Request, Response>[]
}
