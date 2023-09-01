import { CaretDown, Check } from '@phosphor-icons/react';
import * as SelectPrimitive from '@radix-ui/react-select';

const permissions = [
	{
		value: 'read',
		text: 'Leitor',
	},
	{
		value: 'edit',
		text: 'Editor',
	},
];

interface PermissionSelectorProps {
	email: string;
	onChangePermission: (email: string, permission: 'edit' | 'read') => void;
}

export function PermissionSelector({ email, onChangePermission }: PermissionSelectorProps) {
	return (
		<SelectPrimitive.Root
			defaultValue="read"
			onValueChange={(permission) => onChangePermission(email, permission as 'edit' | 'read')}>
			<SelectPrimitive.Trigger className="w-20 py-2 flex gap-1 justify-center items-center rounded text-xs border border-black-700">
				<SelectPrimitive.Value />

				<SelectPrimitive.Icon>
					<CaretDown size={12} color="#FFF" />
				</SelectPrimitive.Icon>
			</SelectPrimitive.Trigger>

			<SelectPrimitive.Portal>
				<SelectPrimitive.Content
					position="popper"
					sideOffset={8}
					className="bg-black-700 rounded px-4 py-2 w-24">
					<SelectPrimitive.Viewport className="flex flex-col gap-2">
						{permissions.map((permission) => (
							<SelectPrimitive.Item
								key={permission.value}
								value={permission.value}
								className="flex justify-between items-center text-sm outline-none cursor-pointer">
								<SelectPrimitive.ItemText>{permission.text}</SelectPrimitive.ItemText>

								<SelectPrimitive.ItemIndicator>
									<Check size={12} color="#FFF" />
								</SelectPrimitive.ItemIndicator>
							</SelectPrimitive.Item>
						))}
					</SelectPrimitive.Viewport>
				</SelectPrimitive.Content>
			</SelectPrimitive.Portal>
		</SelectPrimitive.Root>
	);
}
