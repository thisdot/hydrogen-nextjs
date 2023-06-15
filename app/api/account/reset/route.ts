import { resetCustomersPassword } from '@/lib/shopify';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: NextResponse) {
	const { password, id, resetToken } = await request.json();

	const res = await resetCustomersPassword({
		variables: {
			id: `gid://shopify/Customer/${id}`,
			input: {
				password,
				resetToken,
			},
		},
	});

	const customerAccessToken = res.body.data.customerReset.customerAccessToken;

	if (customerAccessToken) {
		const accessToken = customerAccessToken?.accessToken;
		const expiresAt = customerAccessToken?.expiresAt;

		(cookies() as any).set('customerAccessToken', accessToken, {
			httpOnly: true,
			path: '/',
			sameSite: 'strict',
			secure: true,
		});
	}
		return NextResponse.json({
			customerAccessToken: customerAccessToken?.accessToken ? true : false,
			customerUserErrors: res.body.data.customerReset.customerUserErrors,
		});
}
