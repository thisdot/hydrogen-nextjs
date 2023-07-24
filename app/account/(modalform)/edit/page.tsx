import { getCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';
import AccountForm from '@/components/AccountForm';
import AccountPage from '../../page';

async function AccountDetailsEdit() {
	const token = cookies().get('customerAccessToken')?.value as string;
	const customer = await getCustomer(token);

	return (
		<>
			<AccountForm customer={customer} />
			{
				//@ts-ignore
				<AccountPage />
			}
		</>
	);
}
export default AccountDetailsEdit;
