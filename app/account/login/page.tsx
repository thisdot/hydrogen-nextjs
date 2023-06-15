'use client';

import { getInputStyleClasses } from '@/lib/utils';
import { redirect } from 'next/navigation';
import FormHeader from '../component/FormHeader';
import FormFooter from '../component/FormFooter';
import FormButton from '../component/FormButton';
import { useEffect, useState } from 'react';
import { useCookie } from 'react-use';

export default function LoginPage() {
	const [customerAccessToken, setCookie] = useCookie('customerAccessToken');
	const [nativeEmailError, setNativeEmailError] = useState(null);
	const [nativePasswordError, setNativePasswordError] = useState(null);
	const [nativeUnIdentifiedUserError, setNativeUnIdentifiedUserError] =
		useState(null);
	const [sending, setSending] = useState(false);
	const [btnText, setBtnText] = useState('Sign in');

	const reset = () => {
		setNativeEmailError(null);
		setNativePasswordError(null);
		setBtnText('Sign in');
		setSending(false);
	};

	async function handleSubmit(data: FormData) {
		setSending(true);
		setBtnText('Please wait..');
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
			setCookie(token, {
				expires: new Date(expiresAt),
			});

			redirect('/account');
		}

		if (loginResponse.customerUserErrors.length > 0) {
			loginResponse.customerUserErrors.filter((error: any) => {
				if (error.field) {
					if (error.field.includes('email')) {
						setNativeEmailError(error.message);
					}
					if (error.field.includes('password')) {
						setNativePasswordError(error.message);
					}
				} else {
					if (error.code === "UNIDENTIFIED_CUSTOMER") {
						setNativeUnIdentifiedUserError(error.message)
					}
				}
			});
		}

		setTimeout(() => {
			reset();
		}, 2000);
	}

	useEffect(() => {
		if(customerAccessToken) {
			redirect('/account');
		}
	},[customerAccessToken])

	return (
		<>
			<FormHeader title="Sign in." />
			{nativeUnIdentifiedUserError && (
				<p className="text-red-500 mt-4">{nativeUnIdentifiedUserError}</p>
			)}
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
				<FormFooter page="login" />
			</form>
		</>
	);
}
