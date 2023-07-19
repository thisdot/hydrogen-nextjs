import { getInputStyleClasses } from '@/lib/utils';
import { Button } from './Button';
import FormModal from './FormModal';
import {
	Customer,
	CustomerUpdateInput,
	MailingAddress,
} from '@/lib/shopify/types';
import FormButton from '@/app/account/component/FormButton';
import { Text } from '@/components/Text';
import Password from './Password';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { updateAccount } from '@/lib/shopify';
import { redirect } from 'next/navigation';

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
	};

	return (
		<FormModal heading={'Update your profile'}>
			<form action={handleSubmit}>
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
		</FormModal>
	);
}

export default AccountForm;
