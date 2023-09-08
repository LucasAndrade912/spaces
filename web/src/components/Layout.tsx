import { Link, Outlet } from 'react-router-dom';

import { useAuth } from '../hook/useAuth';
import spacesLogo from '../assets/spacesLogo.svg';

export function Layout() {
	const { user } = useAuth();
	const profilePicture = user?.profilePicture;

	return (
		<div className="p-10">
			<header className="flex justify-between items-center w-full mb-16">
				<Link to="/">
					<img src={spacesLogo} alt="Spaces Logo" />
				</Link>

				<img
					src={profilePicture}
					alt="Foto de perfil do usuário"
					className="w-10 h-10 rounded-full"
				/>
			</header>

			<Outlet />
		</div>
	);
}
