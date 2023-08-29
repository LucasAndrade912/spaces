import { InputHTMLAttributes } from 'react';
import { twMerge } from 'tailwind-merge';

export function InputField(props: InputHTMLAttributes<HTMLInputElement>) {
	const { className, ...rest } = props;

	const defaultStyles =
		'bg-black-800 border border-white/75 rounded px-4 py-[14px] placeholder:text-sm';
	const styles = twMerge(defaultStyles, className);

	return <input className={styles} {...rest} />;
}
