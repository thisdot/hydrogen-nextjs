'use client';

import FormButton from '@/app/account/component/FormButton';
import FormHeader from '@/app/account/component/FormHeader';
import { getInputStyleClasses } from '@/lib/utils';
import { redirect } from 'next/navigation';
import { useState, useRef } from 'react';

export default function ResetPassword({
	params,
}: {
	params: { id: string; resetToken: string };
}) {
	const [sending, setSending] = useState(false);
	const [btnText, setBtnText] = useState('Save');
	const [errorMessage, setErrorMessage] = useState(null);
	const [nativePasswordError, setNativePasswordError] = useState<null | string>(
		null
	);
	const [nativePasswordConfirmError, setNativePasswordConfirmError] = useState<
		null | string
	>(null);

	const passwordInput = useRef<HTMLInputElement>(null);
	const passwordConfirmInput = useRef<HTMLInputElement>(null);

	const validatePasswordConfirm = () => {
		if (!passwordConfirmInput.current) return;

		if (
			passwordConfirmInput.current.value.length &&
			passwordConfirmInput.current.value !== passwordInput.current?.value
		) {
			setNativePasswordConfirmError('The two passwords entered did not match.');
		} else if (
			passwordConfirmInput.current.validity.valid ||
			!passwordConfirmInput.current.value.length
		) {
			setNativePasswordConfirmError(null);
		} else {
			setNativePasswordConfirmError(
				passwordConfirmInput.current.validity.valueMissing
					? 'Please re-enter the password'
					: 'Passwords must be at least 8 characters'
			);
		}
	};

	const handleSubmit = async (data: FormData) => {
		const id = params.id;
		const resetToken = params.resetToken;

		const password = data.get('password') as string;
		const passwordConfirm = data.get('passwordConfirm') as string;

		if (
			!password ||
			!passwordConfirm ||
			typeof password !== 'string' ||
			typeof passwordConfirm !== 'string' ||
			password !== passwordConfirm
		) {
			setNativePasswordConfirmError('The two passwords entered did not match.');
		} else {
			setSending(true);
			setBtnText('Reseting Password..');
			const res = await fetch('/api/account/reset', {
				method: 'post',
				body: JSON.stringify({
					password,
					id,
					resetToken,
				}),
			}).then(async (resp: Response) => await resp.json());

			if (res.customerAccessToken) {
				setBtnText('Attempting to login...');
				redirect('/account');
			}

			if (res.customerUserErrors.length > 0) {
				res.customerUserErrors.filter((error: any) => {
					if (error.code === 'TOKEN_INVALID') {
						setErrorMessage(error.message);
					}
				});
			}
		}
	};

	return (
		<>
			<FormHeader title="Reset Password." />
			<p className="mt-4">Enter a new password for your account.</p>
			{errorMessage && <p className="text-red-500 mt-4">{errorMessage}</p>}
			<form
				action={handleSubmit}
				noValidate
				className="pt-6 pb-8 mt-4 mb-4 space-y-3"
			>
				<div>
					<input
						ref={passwordInput}
						className={`mb-1 ${getInputStyleClasses(nativePasswordError)}`}
						id="password"
						name="password"
						type="password"
						autoComplete="current-password"
						placeholder="Password"
						aria-label="Password"
						minLength={8}
						required
						autoFocus
						onBlur={event => {
							if (
								event.currentTarget.validity.valid ||
								!event.currentTarget.value.length
							) {
								setNativePasswordError(null);
								validatePasswordConfirm();
							} else {
								setNativePasswordError(
									event.currentTarget.validity.valueMissing
										? 'Please enter a password'
										: 'Passwords must be at least 8 characters'
								);
							}
						}}
					/>
					{nativePasswordError && (
						<p className="text-red-500 text-xs">
							{' '}
							{nativePasswordError} &nbsp;
						</p>
					)}
				</div>

				<div>
					<input
						ref={passwordConfirmInput}
						className={`mb-1 ${getInputStyleClasses(
							nativePasswordConfirmError
						)}`}
						id="passwordConfirm"
						name="passwordConfirm"
						type="password"
						autoComplete="current-password"
						placeholder="Re-enter password"
						aria-label="Re-enter password"
						minLength={8}
						required
						autoFocus
						onBlur={validatePasswordConfirm}
					/>
					{nativePasswordConfirmError && (
						<p className="text-red-500 text-xs">
							{' '}
							{nativePasswordConfirmError} &nbsp;
						</p>
					)}
				</div>
				<FormButton btnText={btnText} disabled={sending} />
			</form>
		</>
	);
}
