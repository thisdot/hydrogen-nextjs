import { createCart } from '@/lib/shopify';
import { isShopifyError } from '@/lib/type-guards';
import { NextRequest, NextResponse } from 'next/server';

function formatErrorMessage(err: Error): string {
	return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function POST(req: NextRequest): Promise<Response> {
	try {
		const cart = await createCart();
		return NextResponse.json({ status: 200, cart });
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
