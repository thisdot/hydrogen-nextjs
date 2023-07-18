import { getCachedCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';
import AccountPage from '../../page';
import { flattenConnection } from '@/lib/flattenConnection';
import { Customer, MailingAddress } from '@/lib/shopify/types';
import AddressForm from '@/components/AddressForm';
import { getMailingAddressId } from '@/lib/utils';

function Address({ params }: { params: { id: string } }) {
	const token = cookies().get('customerAccessToken')?.value as string;
	const customer = getCachedCustomer() as Customer;
	const addresses = flattenConnection(customer.addresses) as MailingAddress[];
	const address = addresses.find(res => {
		const editId = decodeURIComponent(params.id);
		const editMailingId = getMailingAddressId(editId);
		const mailingId = getMailingAddressId(res.id);
		return mailingId == editMailingId && params.id !== 'add';
	});

	return (
		<>
			{params.id && (
				<AddressForm
					isNewAddress={params.id === 'add'}
					address={address}
					defaultAddress={customer.defaultAddress}
				/>
			)}

			{
				//@ts-ignore
				<AccountPage />
			}
		</>
	);
}
export default Address;
