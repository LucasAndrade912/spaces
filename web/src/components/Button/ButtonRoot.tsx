import { forwardRef, ComponentProps } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { twMerge } from 'tailwind-merge';

interface ButtonRootProps extends ComponentProps<'button'> {
	asChild?: boolean;
}

export const ButtonRoot = forwardRef<HTMLButtonElement, ButtonRootProps>(
	({ className, asChild, ...props }: ButtonRootProps, ref) => {
		const Component = asChild ? Slot : 'button';

		const defaultStyles =
			'flex justify-center items-center bg-purple-900 py-[14px] rounded shadow-blur gap-[14px] hover:bg-purple-800 transition-colors';
		const styles = twMerge(defaultStyles, className);

		return <Component className={styles} {...props} ref={ref} />;
	}
);
