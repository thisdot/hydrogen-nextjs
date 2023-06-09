import { removeFromCart } from '@/lib/shopify';
import { isShopifyError } from '@/lib/type-guards';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { formatErrorMessage } from '../route';

export async function POST(req: NextRequest): Promise<any> {
	const cartId = cookies().get('cartId')?.value;
	const { lineIds } = await req.json();

	if (!cartId || !lineIds) {
		return NextResponse.json(
			{ error: 'Missing cartId or lineId' },
			{ status: 400 }
		);
	}
	try {
		await removeFromCart(cartId, lineIds);
		return NextResponse.json({ status: 204 });
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
