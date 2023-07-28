import { twMerge } from 'tailwind-merge';

interface ButtonTitleProps {
	children: React.ReactNode;
	className?: string;
}

export function ButtonTitle({ children, className }: ButtonTitleProps) {
	const defaultStyles = 'font-play font-bold text-xl';
	const styles = twMerge(defaultStyles, className);

	return <span className={styles}>{children}</span>;
}
