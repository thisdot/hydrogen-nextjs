import { NextRequest, NextResponse } from 'next/server';
import isAuthenticated from './lib/isAuthenticated';

export const config = {
	matcher: ['/checkout', '/account', '/account/login', '/account/register', '/account/recover']
};

export function middleware(request: NextRequest) {
	const isLoginPage = request.nextUrl.pathname.startsWith('/account/login');
	const isRecoverPasswordPage = request.nextUrl.pathname.startsWith(
		'/account/recover'
	);
	const isRegisterPage =
		request.nextUrl.pathname.startsWith('/account/register');

		if(isLoginPage && isRecoverPasswordPage && isRegisterPage && isAuthenticated(request)) {
			return NextResponse.redirect(new URL('/account', request.url));
		}

		if (!isLoginPage && !isRecoverPasswordPage && !isRegisterPage && !isAuthenticated(request)) {
			return NextResponse.redirect(new URL('/account/login', request.url));
		}
}
