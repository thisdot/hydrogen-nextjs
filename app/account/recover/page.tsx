'use client';

import { getInputStyleClasses } from '@/lib/utils';
import { redirect } from 'next/navigation';
import FormHeader from '../component/FormHeader';
import FormFooter from '../component/FormFooter';
import FormButton from '../component/FormButton';
import { useState } from 'react';

export default function RecoverPassword() {
	const [nativeEmailError, setNativeEmailError] = useState(null);
	const [sending, setSending] = useState(false);
	const [isSubmited, setIsSubmited] = useState(false);
	const [btnText, setBtnText] = useState('Request Reset Link');

	const headings = {
		submited: {
			title: 'Request Sent.',
			description: 'If that email address is in our system, you will receive an email with instructions about how to reset your password in a few minutes.',
		},
		default: {
			title: 'Forgot Password.',
			description: 'Enter the email address associated with your account to receive a link to reset your password.',
		},
	};

	const reset = () => {
		setNativeEmailError(null);
		setBtnText('Request Reset Link');
		setSending(false);
	};

	async function handleSubmit(data: FormData) {
		setSending(true);
		setBtnText('Please wait..');
		const response = await fetch('/api/account/recover', {
			method: 'post',
			body: JSON.stringify({
				email: data.get('email') as string,
			}),
		}).then(async (resp: Response) => await resp.json());

		if (response.customerUserErrors.length > 0) {
			response.customerUserErrors.filter((error: any) => {
				if (error.field.includes('email')) {
					setNativeEmailError(error.message);
				}
			});
		} else {
			setIsSubmited(true);
		}

		setTimeout(() => {
			reset()
		}, 2000);
	}

	return (
		<>
			<FormHeader title={headings[isSubmited ? 'submited' : 'default'].title} />
			<p className="mt-4">
				{headings[isSubmited ? 'submited' : 'default'].description}
			</p>
			{!isSubmited && (
				<form
					action={handleSubmit}
					noValidate
					className="pt-6 pb-8 mt-4 mb-4 space-y-3"
				>
					<div>
						<input
							className={`mb-1 ${getInputStyleClasses(nativeEmailError)}`}
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							placeholder="Email address"
							aria-label="Email address"
							autoFocus
						/>
						{nativeEmailError && (
							<p className="text-red-500 text-xs">{nativeEmailError} &nbsp;</p>
						)}
					</div>
					<FormButton btnText={btnText} disabled={sending} />
					<FormFooter page="recover" />
				</form>

			)}
		</>
	);
}
