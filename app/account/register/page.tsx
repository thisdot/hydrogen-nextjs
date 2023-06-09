import { getInputStyleClasses } from '@/lib/utils';
import Link from 'next/link';
import { revalidatePath } from 'next/cache';
import { createCustomer } from '@/lib/shopify';
import { redirect } from 'next/navigation';

let nativeEmailError: any = null;
let nativePasswordError: any = null;

export default async function RegisterPage() {
	async function handleSubmit(data: FormData) {
		'use server';
		console.log(data.get('email'));

		const res = await createCustomer({
			variables: {
				input: {
					email: data.get('email') as string,
					password: data.get('password') as string,
				},
			},
		});

		if (res.body.data.customerCreate.customer) {
			redirect('/account/login');
		}

		if (res.body.data.customerCreate.customerUserErrors.length > 0) {
			res.body.data.customerCreate.customerUserErrors.filter((error: any) => {
				if (error.field.includes('email')) {
					nativeEmailError = error.message;
				}
				if (error.field.includes('password')) {
					nativePasswordError = error.message;
				}
			});
		}
		revalidatePath('/account/register');
	}

	return (
		<div className="flex justify-center my-24 px-4">
			<div className="max-w-md w-full">
				<h1 className="text-4xl">Create an Account.</h1>
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
					<div className="flex items-center justify-between">
						<button
							className="bg-primary text-contrast rounded py-2 px-4 focus:shadow-outline block w-full"
							type="submit"
						>
							Create Account
						</button>
					</div>
					<div className="flex items-center mt-8 border-t border-gray-300">
						<p className="align-baseline text-sm mt-6">
							Already have an account? &nbsp;
							<Link className="inline underline" href="/account/login">
								Sign in
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
}
