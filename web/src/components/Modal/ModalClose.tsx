import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalCloseProps {
	children: ReactNode;
}

export function ModalClose({ children }: ModalCloseProps) {
	return <Dialog.Close asChild>{children}</Dialog.Close>;
}
