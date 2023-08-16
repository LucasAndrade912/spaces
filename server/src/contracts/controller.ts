export interface Controller<Request = unknown, Response = unknown> {
	handler: (request: Request, response: Response) => Promise<void>;
}
