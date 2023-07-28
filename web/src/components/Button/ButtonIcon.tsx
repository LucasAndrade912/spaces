interface ButtonIconProps {
	children: React.ReactNode;
	className?: string;
}

export function ButtonIcon({ children, className }: ButtonIconProps) {
	return <span className={className}>{children}</span>;
}
