import { getCustomer } from '@/lib/shopify';
import { cookies } from 'next/headers';
import AccountPage from '../../page';
import { flattenConnection } from '@/lib/flattenConnection';
import { MailingAddress } from '@/lib/shopify/types';
import AddressForm from '@/components/AddressForm';
import { getIdFromURL } from '@/lib/utils';

async function Address({ params }: { params: { id: string } }) {
	const token = cookies().get('customerAccessToken')?.value as string;
	const customer = await getCustomer(token);
	const addresses = flattenConnection(customer.addresses) as MailingAddress[];
	const address = addresses.find(res => {
		const editId = decodeURIComponent(params.id);
		const { id: editMailingId } = getIdFromURL(editId);
		const { id: mailingId } = getIdFromURL(res.id);
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
