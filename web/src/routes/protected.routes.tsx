import { Navigate } from 'react-router-dom';

import { useAuth } from '../hook/useAuth';
import { Layout } from '../components/Layout';

export function ProtectedRoutes() {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? <Layout /> : <Navigate to="/login" />;
}
