import { twMerge } from 'tailwind-merge';

interface ButtonRootProps {
	children: React.ReactNode;
	className?: string;
	onClick?: () => void;
}

export function ButtonRoot({ children, className, onClick }: ButtonRootProps) {
	const defaultStyles =
		'flex justify-center items-center bg-purple-900 py-[14px] rounded shadow-blur gap-[14px] hover:bg-purple-800 transition-colors';
	const styles = twMerge(defaultStyles, className);

	return (
		<button onClick={onClick} className={styles}>
			{children}
		</button>
	);
}
