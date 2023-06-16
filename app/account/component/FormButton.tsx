'use client'
import { experimental_useFormStatus as useFormStatus } from "react-dom";
export default function FormButton({
	btnText,
}: {
	btnText: string;
}) {
	const { pending } = useFormStatus()
	return (
		<div className="flex items-center justify-between">
			<button
				className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
				type="submit"
				disabled={pending}
			>
				{pending ? 'Loading...' : btnText}
			</button>
		</div>
	);
}
