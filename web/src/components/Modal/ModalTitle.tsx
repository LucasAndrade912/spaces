import { ReactNode } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface ModalTitleProps {
	children: ReactNode;
}

export function ModalTitle({ children }: ModalTitleProps) {
	return <Dialog.Title className="text-2xl font-play font-bold mb-10">{children}</Dialog.Title>;
}
