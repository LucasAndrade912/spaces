import { ChangeEvent, useRef } from 'react';
import { UploadSimple } from '@phosphor-icons/react';
import * as Label from '@radix-ui/react-label';

interface FileInputProps {
	onUpload: (files: File[]) => void;
}

export function FileInput({ onUpload }: FileInputProps) {
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	function onDragEnter() {
		wrapperRef.current?.classList.add('bg-black-800/30');
	}

	function onDragLeave() {
		wrapperRef.current?.classList.remove('bg-black-800/30');
	}

	function onDrop() {
		wrapperRef.current?.classList.remove('bg-black-800/30');
	}

	function handleFileUpload(event: ChangeEvent<HTMLInputElement>) {
		event.preventDefault();

		if (event.target.files) {
			const { files } = event.target;
			onUpload(Array.from(files));
		}
	}

	return (
		<div
			ref={wrapperRef}
			className="relative flex flex-col gap-3 justify-center items-center w-full py-16 rounded border border-dashed border-white-800 transition-colors hover:bg-black-800/30">
			<Label.Root
				htmlFor="file"
				className="flex flex-col gap-3 justify-center items-center cursor-pointer">
				<UploadSimple size={40} color="#9C9C9C" />

				<span className="font-play text-2xl text-white-800 text-center">
					Arraste e solte <br />
					ou escolha um arquivo para compartilhar
				</span>
			</Label.Root>

			<input
				type="file"
				id="file"
				multiple
				className="w-full h-full absolute opacity-0 cursor-pointer"
				onDragEnter={onDragEnter}
				onDragLeave={onDragLeave}
				onDrop={onDrop}
				onChange={handleFileUpload}
			/>
		</div>
	);
}
