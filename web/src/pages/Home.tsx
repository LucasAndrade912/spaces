import { Link } from 'react-router-dom';
import { MonitorPlay, Files, Folder } from 'phosphor-react';
import { Images } from '@phosphor-icons/react';

import spacesLogo from '../assets/spacesLogo.svg';
import { useAuth } from '../hook/useAuth';
import { spacesMocks } from '../mocks/spacesMocks';

import { Space } from '../components/Space';
import { Select } from '../components/Select';
import { FileTypeQuantity } from '../components/FileTypeQuantity';
import { CreateSpaceModal } from '../components/CreateSpaceModal';

const fileTypeQuantitys = [
	{
		title: 'Imagens',
		quantity: 14,
		icon: <Images size={24} color="#FFF" />,
		bgColor: 'bg-custom-red',
	},
	{
		title: 'Vídeos',
		quantity: 21,
		icon: <MonitorPlay size={24} color="#FFF" />,
		bgColor: 'bg-purple-900',
	},
	{
		title: 'Documentos',
		quantity: 55,
		icon: <Files size={24} color="#FFF" />,
		bgColor: 'bg-custom-orange',
	},
	{
		title: 'Outros',
		quantity: 10,
		icon: <Folder size={24} color="#FFF" />,
		bgColor: 'bg-custom-rose',
	},
];

export function Home() {
	const { user } = useAuth();
	const profilePicture = user?.profilePicture;

	return (
		<>
			<div className="p-10">
				<header className="flex justify-between items-center w-full">
					<Link to="/">
						<img src={spacesLogo} alt="Spaces Logo" />
					</Link>

					<img
						src={profilePicture}
						alt="Foto de perfil do usuário"
						className="w-10 h-10 rounded-full"
					/>
				</header>

				<section className="flex justify-between w-full mt-16">
					<section className="flex gap-20">
						{fileTypeQuantitys.map((item, index) => (
							<FileTypeQuantity.Root key={index}>
								<FileTypeQuantity.Icon className={item.bgColor}>{item.icon}</FileTypeQuantity.Icon>

								<FileTypeQuantity.Content>
									<h3 className="text-sm font-medium">{item.title}</h3>
									<span className="text-[10px] font-normal">{item.quantity} items</span>
								</FileTypeQuantity.Content>
							</FileTypeQuantity.Root>
						))}
					</section>

					<section className="flex gap-6">
						<Select />

						<CreateSpaceModal />
					</section>
				</section>

				<section className="mt-20">
					<h2 className="font-play text-xl font-bold">Seus spaces</h2>

					<div className="w-full mt-6">
						<div className="grid grid-cols-table">
							<span className="text-xs">Nome</span>
							<span className="text-xs">Tamanho</span>
							<span className="text-xs">Última modificação</span>
						</div>

						<div className="w-full h-px bg-black-700 my-6" />

						<div className="flex flex-col gap-8">
							{spacesMocks.map((space) => (
								<Space
									key={space.id}
									id={space.id}
									title={space.title}
									size={space.size}
									lastUpdate={space.lastUpdate}
								/>
							))}
						</div>
					</div>
				</section>
			</div>
		</>
	);
}
