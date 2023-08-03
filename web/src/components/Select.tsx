import { ArrowDown, Check } from '@phosphor-icons/react';
import * as SelectPrimitive from '@radix-ui/react-select';

const selectValues = [
	{
		value: 'name',
		text: 'Nome',
	},
	{
		value: 'size',
		text: 'Tamanho',
	},
	{
		value: 'lastUpdate',
		text: 'Última modificação',
	},
];

export function Select() {
	return (
		<SelectPrimitive.Root defaultValue="name">
			<SelectPrimitive.Trigger className="h-8 flex gap-2 items-center bg-black-800 px-2 rounded text-xs">
				<SelectPrimitive.Value />

				<div className="w-px h-8 bg-black-700" />

				<SelectPrimitive.Icon>
					<ArrowDown size={14} color="#FFF" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>

			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					position="popper"
					sideOffset={8}
					className="bg-black-800 rounded px-4 py-2 w-60">
					<SelectPrimitive.Viewport className="flex flex-col gap-2">
						{selectValues.map((item) => (
							<SelectPrimitive.Item
								key={item.value}
								value={item.value}
								className="flex gap-2 items-center text-sm outline-none cursor-pointer">
								<SelectPrimitive.ItemText>{item.text}</SelectPrimitive.ItemText>
								<SelectPrimitive.ItemIndicator>
									<Check size={16} color="#FFF" />
								</SelectPrimitive.ItemIndicator>
							</SelectPrimitive.Item>
						))}
					</SelectPrimitive.Viewport>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
}
