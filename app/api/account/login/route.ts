import { loginCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';

import { cookies } from 'next/headers';

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

	const customerAccessToken =
		res.body.data.customerAccessTokenCreate.customerAccessToken;

	if (customerAccessToken) {
		const token =
			customerAccessToken.accessToken;
		const expiresAt =
			customerAccessToken.expiresAt;

		(cookies() as any).set('customerAccessToken', token, {
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
			secure: true,
		});
	}
	return NextResponse.json({
		customerAccessToken: customerAccessToken?.accessToken ? true :  false,
		customerUserErrors:
			res.body.data.customerAccessTokenCreate.customerUserErrors,
	});
}
