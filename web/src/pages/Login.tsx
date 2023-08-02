import { Navigate } from 'react-router-dom';
import { GoogleLogo } from '@phosphor-icons/react';

import spacesLogo from '../assets/spacesLogoSmall.svg';
import { Button } from '../components/Button';
import { useAuth } from '../hook/useAuth';
import { getGoogleOAuthUrl } from '../utils/getGoogleOAuthUrl';

export function Login() {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to="/" />;
	}

	return (
		<>
			<img src={spacesLogo} alt="Spaces Logo" className="absolute top-[72px] left-[72px]" />
			<div className="flex justify-center items-center h-screen">
				<div className="flex flex-col w-[400px] mb-10 text-center">
					<h1 className="mb-8 text-[40px] font-bold font-play">Crie sua conta</h1>

					<span className="mb-[72px] font-thin">
						Cadastre sua conta e compartilhe arquivos com quem quiser criando um{' '}
						<strong className="text-purple-900 font-bold">space</strong>.
					</span>

					<Button.Root asChild>
						<a href={getGoogleOAuthUrl('/')}>
							<Button.Icon>
								<GoogleLogo weight="bold" size={28} />
							</Button.Icon>

							<Button.Title>Logar com Google</Button.Title>
						</a>
					</Button.Root>
				</div>
			</div>
		</>
	);
}
