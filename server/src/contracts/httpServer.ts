import { Route } from './route';

export abstract class HttpServer {
	constructor (protected readonly port: number) {}

	abstract createRoute(route: Route): void;
	abstract start(callback?: () => void): void
}
