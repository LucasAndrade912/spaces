import { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputRootProps {
	children: ReactNode;
	className?: string;
}

export function InputRoot({ children, className }: InputRootProps) {
	const defaultStyles = 'flex flex-col gap-3 w-full';

	const styles = twMerge(defaultStyles, className);

	return <div className={styles}>{children}</div>;
}
