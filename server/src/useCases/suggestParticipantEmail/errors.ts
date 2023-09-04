export class EmptyEmailError extends Error {
	constructor() {
		super('Please send a partial email so we can search');
		this.name = 'EmptyEmailError';
		this.cause = 'Partial email not sent';
	}
}
