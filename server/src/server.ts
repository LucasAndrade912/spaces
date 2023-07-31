import express from 'express';
import axios from 'axios';
import 'dotenv/config';

const FRONT_END_URL = 'http://localhost:5173';
const PORT = process.env.PORT || 3000;
const app = express();

app.get('/oauth', async (req, res) => {
	const rootUrl = 'https://oauth2.googleapis.com/token';
	const { code, state } = req.query;

	const options = {
		code,
		client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
		client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
		redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT,
		grant_type: 'authorization_code'
	};

	const { data } = await axios.post(
		rootUrl,
		options,
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
	);

	const { data: user } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${data.access_token}`);

	res.redirect(`${FRONT_END_URL}${state}`);
});

app.listen(PORT, () => {
	console.log(`🚀 Server is running on localhost:${PORT}`);
});
