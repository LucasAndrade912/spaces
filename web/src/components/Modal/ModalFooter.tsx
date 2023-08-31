import { ReactNode } from 'react';

interface ModalFooterProps {
	children: ReactNode;
}

export function ModalFooter({ children }: ModalFooterProps) {
	return <footer className="flex justify-end gap-4 mt-20">{children}</footer>;
}
