import { ButtonHTMLAttributes } from 'react';

export default function FormButton({
	btnText,
	disabled,
}: {
	btnText: string;
	disabled?: boolean;
}) {
	return (
		<div className="flex items-center justify-between">
			<button
				className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
				type="submit"
				disabled={disabled}
			>
				{btnText}
			</button>
		</div>
	);
}
