import { loginCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function POST(request: NextResponse) {
	const { email, password } = await request.json();

	const res = await loginCustomer({
		variables: {
			input: {
				email,
				password,
			},
		},
	});
	return NextResponse.json({
		customerAccessToken:
			res.body.data.customerAccessTokenCreate.customerAccessToken,
		customerUserErrors:
			res.body.data.customerAccessTokenCreate.customerUserErrors,
	});
}
