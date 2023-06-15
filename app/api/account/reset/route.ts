import { resetCustomersPassword } from '@/lib/shopify';
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

	return NextResponse.json({
		customerAccessToken: res.body.data.customerReset.customerAccessToken,
		customerUserErrors: res.body.data.customerReset.customerUserErrors,
	});
}
