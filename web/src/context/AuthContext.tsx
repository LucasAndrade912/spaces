import { createContext, useState, useEffect } from 'react';

import { api } from '../lib/api';

interface UserProps {
	email: string;
	profilePicture: string;
}

interface AuthContextProps {
	user: UserProps | null;
	isAuthenticated: boolean;
}

interface AuthContextProviderProps {
	children: React.ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
	const [user, setUser] = useState<UserProps | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(true);

	async function fetchUserInfo() {
		try {
			const { data } = await api.get('/me');

			setUser({
				email: data.user.email,
				profilePicture: data.user.avatar,
			});
			setIsAuthenticated(true);
		} catch (error) {
			setUser(null);
			setIsAuthenticated(false);
			console.log(error);
		}
	}

	useEffect(() => {
		fetchUserInfo();
	}, []);

	return <AuthContext.Provider value={{ user, isAuthenticated }}>{children}</AuthContext.Provider>;
}
