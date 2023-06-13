import { createCustomer } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function POST(request: NextResponse) {
	const { email, password } = await request.json();

	const res = await createCustomer({
		variables: {
			input: {
				email,
				password,
			},
		},
	});
	return NextResponse.json({
		customer: res.body.data.customerCreate.customer,
		customerUserErrors: res.body.data.customerCreate.customerUserErrors,
	});
}
