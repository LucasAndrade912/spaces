import { Trash } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';
import * as ContextMenu from '@radix-ui/react-context-menu';

import { PermissionSelector } from './PermissionSelector';

interface SharedUserProps {
	profilePicture: string;
	email: string;
	onDelete: (email: string) => void;
	onChangePermission: (email: string, permission: 'edit' | 'read') => void;
	className?: string;
}

export function SharedUser({
	profilePicture,
	email,
	onDelete,
	onChangePermission,
	className,
}: SharedUserProps) {
	const defaultStyles =
		'flex justify-between items-center rounded cursor-pointer pl-1 transition-colors hover:bg-black-600';

	const styles = twMerge(defaultStyles, className);

	return (
		<ContextMenu.Root>
			<ContextMenu.Trigger className={styles}>
				<div className="flex gap-2 items-center">
					<img src={profilePicture} alt="Foto de usuário" className="w-5 h-5 rounded-full" />

					<span className="text-xs">{email}</span>
				</div>

				<PermissionSelector email={email} onChangePermission={onChangePermission} />
			</ContextMenu.Trigger>

			<ContextMenu.Portal>
				<ContextMenu.Content className="bg-black-700 rounded cursor-pointer">
					<ContextMenu.Item
						className="flex gap-2 items-center py-[6px] px-[14px] rounded transition-colors hover:bg-red-700/60"
						onSelect={() => onDelete(email)}>
						<Trash size={14} color="#FFF" />
						<span className="text-xs">Remover</span>
					</ContextMenu.Item>
				</ContextMenu.Content>
			</ContextMenu.Portal>
		</ContextMenu.Root>
	);
}
