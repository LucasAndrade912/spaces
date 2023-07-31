import { ButtonHTMLAttributes } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';

interface ButtonRootProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	asChild?: boolean;
}

export function ButtonRoot({ className, asChild, ...props }: ButtonRootProps) {
	const Component = asChild ? Slot : 'button';

	const defaultStyles =
		'flex justify-center items-center bg-purple-900 py-[14px] rounded shadow-blur gap-[14px] hover:bg-purple-800 transition-colors';
	const styles = twMerge(defaultStyles, className);

	return <Component className={styles} {...props} />;
}
