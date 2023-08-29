import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalContentProps {
	children: ReactNode;
}

export function ModalContent({ children }: ModalContentProps) {
	return (
		<Dialog.Portal>
			<Dialog.Overlay className="w-screen h-screen bg-black-900/75 fixed inset-0" />

			<Dialog.Content className="flex flex-col bg-black-800 rounded fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 w-[464px] shadow-modal">
				{children}
			</Dialog.Content>
		</Dialog.Portal>
	);
}
