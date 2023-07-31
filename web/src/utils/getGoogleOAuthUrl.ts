export function getGoogleOAuthUrl(redirectTo: string) {
	const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';

	const options = {
		client_id: import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID,
		redirect_uri: import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT,
		response_type: 'code',
		scope: [
			'https://www.googleapis.com/auth/userinfo.email',
			'https://www.googleapis.com/auth/userinfo.profile'
		].join(' '),
		prompt: 'consent',
		state: redirectTo
	};

	const queryString = new URLSearchParams(options);
	return `${rootUrl}?${queryString}`;
}
