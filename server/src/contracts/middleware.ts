export interface Middleware<Request = unknown, Response = unknown> {
	handler: (request: Request, response: Response, next: () => void) => Promise<unknown>;
}
