import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalRootProps {
	children: ReactNode;
}

export function ModalRoot({ children }: ModalRootProps) {
	return <Dialog.Root>{children}</Dialog.Root>;
}
