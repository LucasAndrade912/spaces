import { useState, useEffect } from 'react';
import { Plus } from '@phosphor-icons/react';
import * as ScrollArea from '@radix-ui/react-scroll-area';

import { Modal } from './Modal';
import { Button } from './Button';
import { Input } from './Input';
import { SharedUser } from './SharedUser';
import { api } from '../lib/api';

type SharedUserData = {
	email: string;
	profilePicture: string;
	permission: 'edit' | 'read';
};

type SuggestedUser = Omit<SharedUserData, 'permission'>;

type RequestData = {
	message: string;
	user: {
		email: string;
		avatar: string;
	};
};

export function CreateSpaceModal() {
	const [isLoading, setIsLoading] = useState(false);
	const [spaceName, setSpaceName] = useState('');
	const [participantEmail, setParticipantEmail] = useState('');
	const [suggestedUser, setSuggestedUser] = useState<SuggestedUser | null>(null);
	const [sharedUsers, setSharedUsers] = useState<SharedUserData[]>([]);

	async function handleCreateSpace() {
		setIsLoading(true);

		try {
			await api.post('/spaces', {
				name: spaceName,
				participants: sharedUsers.map((user) => ({
					email: user.email,
					permission: user.permission,
				})),
			});

			alert('Space criado com sucesso!');
		} catch (error) {
			console.log(error);
		} finally {
			setIsLoading(false);
		}
	}

	async function handleSearchUser(email: string) {
		setParticipantEmail(email);

		const partialEmailValidator = /([a-zA-Z0-9._-]+)@$/;

		if (partialEmailValidator.test(email)) {
			const { data } = await api.get<RequestData>(`/users/participant?email=${email}`);

			setSuggestedUser({
				email: data.user.email,
				profilePicture: data.user.avatar,
			});
		}
	}

	function handleAddUser(email: string, profilePicture: string) {
		setSharedUsers((prev) => [...prev, { email, profilePicture, permission: 'read' }]);
		setParticipantEmail('');
		setSuggestedUser(null);
	}

	function handleRemoveUser(email: string) {
		setSharedUsers((prev) => {
			return prev.filter((user) => user.email !== email);
		});
	}

	function handleChangePermission(email: string, permission: 'edit' | 'read') {
		setSharedUsers((prev) => {
			const user = prev.find((user) => user.email === email) as SharedUserData;
			const index = prev.findIndex((user) => user.email === email);

			user.permission = permission;

			const users = prev.filter((user) => user.email !== email);
			users.splice(index, 0, user);

			return users;
		});
	}

	useEffect(() => {
		if (participantEmail.length === 0) {
			setSuggestedUser(null);
		}
	}, [participantEmail]);

	return (
		<Modal.Root>
			<Modal.Trigger>
				<Button.Root className="h-8 gap-2 px-3">
					<Button.Icon>
						<Plus size={16} color="#FFF" weight="bold" />
					</Button.Icon>

					<Button.Title className="text-sm">Criar Space</Button.Title>
				</Button.Root>
			</Modal.Trigger>

			<Modal.Content>
				<Modal.Title>Novo Space</Modal.Title>

				<Input.Root>
					<Input.Label htmlFor="space-name">Nome do Space</Input.Label>

					<Input.Field
						id="space-name"
						type="text"
						placeholder="Nome do space..."
						value={spaceName}
						onChange={(event) => setSpaceName(event.target.value)}
					/>
				</Input.Root>

				<Input.Root className="mt-6 relative">
					<Input.Label htmlFor="participant-email">Adicionar participante</Input.Label>

					<Input.Field
						id="participant-email"
						type="email"
						placeholder="Email do participante"
						value={participantEmail}
						onChange={(event) => handleSearchUser(event.target.value)}
					/>

					{suggestedUser && participantEmail.length > 0 && (
						<div className="absolute top-[92px] flex flex-col w-full z-20">
							<button
								onClick={() => handleAddUser(suggestedUser.email, suggestedUser.profilePicture)}
								className="flex gap-2 items-center bg-black-700 py-2 pl-2 w-full transition-colors hover:bg-black-600 last:rounded-b">
								<img
									src={suggestedUser.profilePicture}
									alt="Foto de usuário"
									className="w-5 h-5 rounded-full"
								/>

								<span className="text-xs">{suggestedUser.email}</span>
							</button>
						</div>
					)}
				</Input.Root>

				<ScrollArea.Root className="h-32 overflow-hidden mt-6">
					<ScrollArea.Viewport className="w-full h-full">
						<div className="flex flex-col gap-4">
							{sharedUsers.map((user) => (
								<SharedUser
									key={user.email}
									email={user.email}
									profilePicture={user.profilePicture}
									onDelete={handleRemoveUser}
									onChangePermission={handleChangePermission}
								/>
							))}
						</div>
					</ScrollArea.Viewport>

					<ScrollArea.Scrollbar orientation="vertical" />
				</ScrollArea.Root>

				<Modal.Footer>
					<Modal.Close>
						<Button.Root className="h-8 gap-2 px-3 bg-custom-red hover:bg-custom-red/80">
							<Button.Title className="text-sm">Cancelar</Button.Title>
						</Button.Root>
					</Modal.Close>

					<Modal.Close>
						<Button.Root
							disabled={isLoading}
							className="h-8 gap-2 px-3"
							onClick={handleCreateSpace}>
							<Button.Title className="text-sm">Criar</Button.Title>
						</Button.Root>
					</Modal.Close>
				</Modal.Footer>
			</Modal.Content>
		</Modal.Root>
	);
}
