interface FileTypeQuantityContentProps {
	children: React.ReactNode;
}

export function FileTypeQuantityContent({ children }: FileTypeQuantityContentProps) {
	return <div className="flex flex-col justify-between">{children}</div>;
}
