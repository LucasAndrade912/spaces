import express, { NextFunction, Request, Response } from 'express';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import { prisma } from './lib/prisma';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(cors({
	credentials: true,
	origin: process.env.FRONT_END_ORIGIN
}));
app.use(express.json());

async function authMiddleware(req: Request, res: Response, next: NextFunction) {
	const { token } = req.cookies;

	if (!token) {
		return res.status(401).send();
	}

	try {
		const { sub } = jwt.verify(token, process.env.JWT_SECRET as string);

		res.locals.user = sub as string;

		next();
	} catch {
		return res.status(401).send();
	}
}

app.get('/me', authMiddleware, async (req, res) => {
	const user = await prisma.user.findUnique({
		where: { id: String(res.locals.user) }
	});

	return res.json({ user });
});

app.get('/oauth', async (req, res) => {
	const rootUrl = 'https://oauth2.googleapis.com/token';
	const { code, state: path } = req.query;

	if (!code) {
		return res.status(401).send();
	}

	const options = {
		code,
		client_id: process.env.GOOGLE_OAUTH_CLIENT_ID,
		client_secret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
		redirect_uri: process.env.GOOGLE_OAUTH_REDIRECT,
		grant_type: 'authorization_code'
	};

	const { data: { access_token } } = await axios.post(
		rootUrl,
		options,
		{
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		}
	);

	const { data: userInfo } = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`);

	let user = await prisma.user.findUnique({
		where: {
			email: userInfo.email
		}
	});

	if (!user) {
		user = await prisma.user.create({
			data: {
				name: userInfo.name,
				email: userInfo.email,
				profilePicture: userInfo.picture
			}
		});
	}

	const token = jwt.sign(
		{
			name: user.name,
			email: user.email
		},
		process.env.JWT_SECRET as string,
		{
			subject: user.id,
			expiresIn: '30d'
		}
	);

	const cookieMaxAge = 1000 * 60 * 60 * 24 * 30; // 30 days

	res
		.cookie('token', token, {
			maxAge: cookieMaxAge,
			httpOnly: true
		})
		.redirect(`${process.env.FRONT_END_ORIGIN}${path}`);
});

app.listen(PORT, () => {
	console.log(`🚀 Server is running on localhost:${PORT}`);
});
