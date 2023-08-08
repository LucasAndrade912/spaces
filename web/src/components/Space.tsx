import { DotsThreeVertical, Folder } from '@phosphor-icons/react';
import { formatSpaceSize } from '../utils/formatSpaceSize';

interface SpaceProps {
	id: string;
	title: string;
	size: number;
	lastUpdate: string;
}

export function Space({ id, title, size, lastUpdate }: SpaceProps) {
	return (
		<div className="grid grid-cols-table">
			<span className="flex items-center gap-3 text-sm cursor-pointer">
				<Folder size={24} color="#FFF" />
				{title}
			</span>
			<span className="text-sm">{formatSpaceSize(size)}</span>
			<span className="text-sm">{lastUpdate}</span>
			<DotsThreeVertical size={18} className="justify-self-end cursor-pointer" />
		</div>
	);
}
