import { deleteAddress } from '@/lib/shopify';
import { isShopifyError } from '@/lib/type-guards';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

function formatErrorMessage(err: Error): string {
	return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function POST(req: NextRequest): Promise<any> {
	const accessToken = cookies().get('customerAccessToken')?.value;
	const { addressId } = await req.json();

	if (!accessToken || !addressId) {
		return NextResponse.json(
			{ error: 'Missing addressId or not authorized' },
			{ status: 400 }
		);
	}
	try {
		const deletedCustomerAddress = await deleteAddress({
			customerAccessToken: accessToken,
			id: addressId,
		});
		return NextResponse.json({ status: 204, deletedCustomerAddress });
	} catch (e) {
		if (isShopifyError(e)) {
			return NextResponse.json(
				{ message: formatErrorMessage(e.message) },
				{ status: e.status }
			);
		}

		return NextResponse.json({ status: 500 });
	}
}
