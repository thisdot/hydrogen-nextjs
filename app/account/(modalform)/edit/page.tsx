import { getCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';
import AccountForm from '@/components/AccountForm';

async function AccountDetailsEdit() {
	const token = cookies().get('customerAccessToken')?.value as string;
	const customer = await getCustomer(token);

	return (
		<>
			<AccountForm customer={customer} />
		</>
	);
}
export default AccountDetailsEdit;
