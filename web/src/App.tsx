import { GoogleLogo } from '@phosphor-icons/react';

import spacesLogo from './assets/spacesLogoSmall.svg';

export function App() {
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

					<button className="font-play font-bold text-xl flex justify-center items-center bg-purple-900 py-[14px] rounded shadow-blur gap-[14px] w-full hover:bg-purple-800 transition-colors">
						<GoogleLogo weight="bold" size={28} />
						Logar com Google
					</button>
				</div>
			</div>
		</>
	);
}
