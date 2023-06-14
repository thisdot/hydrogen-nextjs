import { addToCart, updateCart, removeFromCart, getCart } from '@/lib/shopify';
import { isShopifyError } from '@/lib/type-guards';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function formatErrorMessage(err: Error): string {
	return JSON.stringify(err, Object.getOwnPropertyNames(err));
}

export async function GET(req: NextRequest): Promise<Response> {
	const cartId = cookies().get('cartId')?.value;

	if (!cartId?.length) {
		return NextResponse.json({ error: 'Missing cartId' }, { status: 400 });
	}
	try {
		const cart = await getCart(cartId);
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

export async function POST(req: NextRequest): Promise<Response> {
	const cartId = cookies().get('cartId')?.value;
	const { merchandiseId } = await req.json();

	if (!cartId?.length || !merchandiseId?.length) {
		return NextResponse.json(
			{ error: 'Missing cartId or variantId' },
			{ status: 400 }
		);
	}
	try {
		const cart = await addToCart(cartId, [{ merchandiseId, quantity: 1 }]);
		return NextResponse.json({ status: 204, cart });
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

export async function PUT(req: NextRequest): Promise<Response> {
	const cartId = cookies().get('cartId')?.value;
	const { variantId, quantity, lineId } = await req.json();

	if (!cartId || !variantId || !quantity || !lineId) {
		return NextResponse.json(
			{ error: 'Missing cartId, variantId, lineId, or quantity' },
			{ status: 400 }
		);
	}
	try {
		const cart = await updateCart(cartId, [
			{
				id: lineId,
				merchandiseId: variantId,
				quantity,
			},
		]);
		return NextResponse.json({ status: 204, cart });
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
