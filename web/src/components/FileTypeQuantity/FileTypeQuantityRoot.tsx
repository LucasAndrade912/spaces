interface FileTypeQuantityRootProps {
	children: React.ReactNode;
}

export function FileTypeQuantityRoot({ children }: FileTypeQuantityRootProps) {
	return <div className="flex gap-4 items-center">{children}</div>;
}
