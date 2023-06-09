import { FeaturedSection } from '@/components/FeaturedSection';
import {
	getFeaturedProducts,
	getFeaturedCollections,
	getCustomer,
} from '@/lib/shopify';
import SignOutSection from './component/SignOutSection';
import OrderHistory from './component/OrderHistory';
import AccountDetails from './component/AccountDetails';
import AccountBook from './component/AccountBook';
import { cookies } from 'next/headers';
import { PageHeader } from '@/components/Text';
import { flattenConnection } from '@/lib/flattenConnection';
import { Order } from '@/lib/shopify/types';

export default async function AccountPage() {
	const token = cookies().get('customerAccessToken')?.value as string;
	const customer = await getCustomer(token);
	const { orders, firstName } = customer;
	const heading = customer
		? firstName
			? `Welcome, ${firstName}.`
			: `Welcome to your account.`
		: 'Account Details';

	const customerOrders = flattenConnection(orders) as Order[];

	const featuredProductsResponse = await getFeaturedProducts();
	const featuredCollectionsResponse = await getFeaturedCollections();

	return (
		<div>
			<PageHeader heading={heading}>
				<SignOutSection />
			</PageHeader>
			{customerOrders && <OrderHistory />}
			<AccountDetails />
			<AccountBook />
			{!customerOrders.length && (
				<FeaturedSection
					featuredProducts={featuredProductsResponse.body.data.products.nodes}
					featuredCollections={
						featuredCollectionsResponse.body.data.collections.nodes
					}
				/>
			)}
		</div>
	);
}
