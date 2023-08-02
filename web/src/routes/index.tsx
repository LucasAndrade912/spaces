import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Home } from '../pages/Home';

import { ProtectedRoutes } from './protected.routes';

const router = createBrowserRouter([
	{
		path: '/',
		element: <ProtectedRoutes />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

export function Routes() {
	return <RouterProvider router={router} />;
}
