import { recoverCustomersPassword } from '@/lib/shopify';
import { NextResponse } from 'next/server';

export async function POST(request: NextResponse) {
	const { email } = await request.json();

	const res = await recoverCustomersPassword({
		variables: {
			email,
		},
	});

	console.log('====================================');
	console.log(res);
	console.log('====================================');
	return NextResponse.json({
		customerUserErrors: res.body.data.customerRecover.customerUserErrors,
	});
}
