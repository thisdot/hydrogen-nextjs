'use client';

import { getInputStyleClasses } from '@/lib/utils';
import { redirect } from 'next/navigation';
import FormHeader from '../component/FormHeader';
import FormFooter from '../component/FormFooter';
import FormButton from '../component/FormButton';
import { useState } from 'react';
// import { useCookie } from 'react-use';
import { setCookie } from 'cookies-next';

export default function RegisterPage() {
	// const [, setCookie] = useCookie('customerAccessToken');
	const [nativeEmailError, setNativeEmailError] = useState(null);
	const [nativePasswordError, setNativePasswordError] = useState(null);
	const [sending, setSending] = useState(false);
	const [btnText, setBtnText] = useState('Create Account');

	const reset = () => {
		setNativeEmailError(null);
		setNativePasswordError(null);
		setBtnText('Create Account');
		setSending(false);
	};

	async function handleSubmit(data: FormData) {
		setSending(true);
		setBtnText('Creating Account..');
		const res = await fetch('/api/account/register', {
			method: 'post',
			body: JSON.stringify({
				email: data.get('email') as string,
				password: data.get('password') as string,
			}),
		}).then(async (resp: Response) => await resp.json());

		if (res.customer) {
			//If custome created, Log in user
			setBtnText('Attempting to login...');

			const loginResponse = await fetch('/api/account/login', {
				method: 'post',
				body: JSON.stringify({
					email: data.get('email') as string,
					password: data.get('password') as string,
				}),
			}).then(async (resp: Response) => await resp.json());

			if (loginResponse.customerAccessToken?.accessToken) {
				const token = loginResponse.customerAccessToken?.accessToken;
				const expiresAt = loginResponse.customerAccessToken?.expiresAt;
				setCookie('customerAccessToken', token, {
					expires: new Date(expiresAt),
				});

				redirect('/account');
			}
		}

		if (res.customerUserErrors.length > 0) {
			res.customerUserErrors.filter((error: any) => {
				if (error.field) {
					if (error.field.includes('email')) {
						setNativeEmailError(error.message);
					}
					if (error.field.includes('password')) {
						setNativePasswordError(error.message);
					}
				}
			});
		}

		setTimeout(() => {
			reset();
		}, 2000);
	}

	return (
		<>
			<FormHeader title="Create an Account." />
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
				<div>
					<input
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
					/>
					{nativePasswordError && (
						<p className="text-red-500 text-xs">
							{' '}
							{nativePasswordError} &nbsp;
						</p>
					)}
				</div>
				<FormButton btnText={btnText} disabled={sending} />
				<FormFooter page="register" />
			</form>
		</>
	);
}
