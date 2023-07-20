import { getInputStyleClasses } from '@/lib/utils';
import { Button } from './Button';
// import FormModal from './FormModal';
import {
	Customer,
	CustomerUpdateInput,
	// MailingAddress,
} from '@/lib/shopify/types';
import FormButton from '@/app/account/component/FormButton';
import { Text } from '@/components/Text';
import Password from './Password';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { updateAccount } from '@/lib/shopify';
import { redirect } from 'next/navigation';
import { IconClose } from './Icon';

let formError: string | null = null;

interface IAccountForm {
	customer?: Customer;
}
function AccountForm({ customer }: IAccountForm) {
	const handleSubmit = async (formData: FormData) => {
		'use server';
		formError = null;

		const token = cookies().get('customerAccessToken')?.value as string;
		const customerInput: CustomerUpdateInput = {};

		const keys: (keyof CustomerUpdateInput)[] = [
			'lastName',
			'firstName',
			'email',
			'phone',
			'password',
		];

		keys.forEach(key => {
			const value = formData.get(key === 'password' ? 'newPassword' : key);
			if (typeof value === 'string') {
				(customerInput[key] as string) = value;
			}
		});

		try {
			const updateAccountResponse = await updateAccount({
				variables: {
					customer: customerInput,
					customerAccessToken: token,
				},
			});

			const accountUpdated = updateAccountResponse.body.data.customerUpdate;

			const customerUserErrors = accountUpdated.customerUserErrors;

			customerUserErrors.forEach(({ code, field, message }) => {
				formError = message;
			});
		} catch (error) {
			console.log(error);
		}
		if (!formError) {
			revalidatePath('/account');
			redirect('/account');
		}

		revalidatePath('/account');

	};

	async function handleCane() {
		'use server'
		formError = null;
		revalidatePath('/account/edit');
		revalidatePath('/account');
		redirect('/account')
	}

	return (
		<>
			<div className="fixed inset-0 z-20 transition-opacity bg-opacity-75 bg-primary/40" />
			<div className="fixed inset-0 z-50 overflow-y-auto">
				<div className="flex items-center justify-center min-h-full p-4 text-center sm:p-0">
					<div className="relative flex-1 px-4 pt-5 pb-4 overflow-hidden text-left transition-all transform rounded shadow-xl bg-contrast sm:my-12 sm:flex-none sm:w-full sm:max-w-sm sm:p-6">
						<Text className="mt-4 mb-6" as="h3" size="lead">
							Update your profile
						</Text>
						<form className="absolute top-0 right-0 hidden pt-4 pr-4 sm:block" action={handleCane}>
							<Button
								className="p-4 -m-4 transition text-primary hover:text-primary/50"
								type="submit"
								variant="outline"
							>
								<IconClose />
							</Button>
						</form>
						<div className="max-w-lg">
							<form action={handleSubmit} noValidate>
								{formError && (
									<div className="flex items-center justify-center mb-6 bg-red-100 rounded">
										<p className="m-4 text-sm text-red-900">{formError}</p>
									</div>
								)}
								<div className="mt-3">
									<input
										className={getInputStyleClasses()}
										id="firstName"
										name="firstName"
										type="text"
										autoComplete="given-name"
										placeholder="First name"
										aria-label="First name"
										defaultValue={customer?.firstName ?? ''}
									/>
								</div>
								<div className="mt-3">
									<input
										className={getInputStyleClasses()}
										id="lastName"
										name="lastName"
										type="text"
										autoComplete="family-name"
										placeholder="Last name"
										aria-label="Last name"
										defaultValue={customer?.lastName ?? ''}
									/>
								</div>
								<div className="mt-3">
									<input
										className={getInputStyleClasses()}
										id="phone"
										name="phone"
										type="tel"
										autoComplete="tel"
										placeholder="Mobile"
										aria-label="Mobile"
										defaultValue={customer?.phone ?? ''}
									/>
								</div>
								<div className="mt-3">
									<input
										// className={getInputStyleClasses(actionData?.fieldErrors?.email)}
										className={getInputStyleClasses()}
										id="email"
										name="email"
										type="email"
										autoComplete="email"
										required
										placeholder="Email address"
										aria-label="Email address"
										defaultValue={customer?.email ?? ''}
									/>
									{/* {actionData?.fieldErrors?.email && (
            <p className="text-red-500 text-xs">
              {actionData.fieldErrors.email} &nbsp;
            </p>
          )} */}
								</div>
								<Text className="mb-6 mt-6" as="h3" size="lead">
									Change your password
								</Text>
								<Password
									name="currentPassword"
									label="Current password"
								// passwordError={actionData?.fieldErrors?.currentPassword}
								/>
								{/* {actionData?.fieldErrors?.currentPassword && (
          <Text size="fine" className="mt-1 text-red-500">
            {actionData.fieldErrors.currentPassword} &nbsp;
          </Text>
        )} */}
								<Password
									name="newPassword"
									label="New password"
								// passwordError={actionData?.fieldErrors?.newPassword}
								/>
								<Password
									name="newPassword2"
									label="Re-enter new password"
								// passwordError={actionData?.fieldErrors?.newPassword2}
								/>
								<Text
									size="fine"
									color="subtle"
								// className={clsx(
								//   'mt-1',
								//   actionData?.fieldErrors?.newPassword && 'text-red-500',
								// )}
								>
									Passwords must be at least 8 characters.
								</Text>
								{/* {actionData?.fieldErrors?.newPassword2 ? <br /> : null}
        {actionData?.fieldErrors?.newPassword2 && (
          <Text size="fine" className="mt-1 text-red-500">
            {actionData.fieldErrors.newPassword2} &nbsp;
          </Text>
        )} */}
								<div className="mt-6">
									<FormButton state="Saving" btnText="Save" />
								</div>
								<div className="mb-4 mt-2">
									<Button
										to="/account"
										className="text-sm"
										variant="secondary"
										width="full"
									>
										Cancel
									</Button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default AccountForm;
