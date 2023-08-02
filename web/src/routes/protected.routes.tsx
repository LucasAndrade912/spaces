import { Outlet, Navigate } from 'react-router-dom';

import { useAuth } from '../hook/useAuth';

export function ProtectedRoutes() {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}
