import { twMerge } from 'tailwind-merge';

interface FileTypeQuantityIconProps {
	children: React.ReactNode;
	className?: string;
}

export function FileTypeQuantityIcon({ children, className }: FileTypeQuantityIconProps) {
	const defaultStyles = 'p-1 flex rounded justify-center items-center bg-custom-red';
	const styles = twMerge(defaultStyles, className);

	return <span className={styles}>{children}</span>;
}
