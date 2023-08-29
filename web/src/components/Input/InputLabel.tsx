import { LabelHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';
import * as Label from '@radix-ui/react-label';

export function InputLabel({
	children,
	className,
	...rest
}: LabelHTMLAttributes<HTMLLabelElement>) {
	const defaultStyles = 'text-base font-medium text-white';

	const styles = twMerge(defaultStyles, className);

	return (
		<Label.Root className={styles} {...rest}>
			{children}
		</Label.Root>
	);
}
