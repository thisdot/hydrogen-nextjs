'use client';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
export default function FormButton({
	btnText,
	state = 'Loading...',
}: {
	btnText: string;
	state?: string;
}) {
	const status = useFormStatus?.(); //this hack is needed to make AddressForm component work on storybook
	return (
		<div className="flex items-center justify-between">
			<button
				className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
				type="submit"
				disabled={status?.pending}
			>
				{status?.pending ? state : btnText}
			</button>
		</div>
	);
}
