import { NextRequest, NextResponse } from 'next/server';
import isAuthenticated from './lib/isAuthenticated';

export const config = {
	matcher: ['/checkout', '/account', '/account/login', '/account/register', '/account/forgot-password']
};

export function middleware(request: NextRequest) {
	const isLoginPage = request.nextUrl.pathname.startsWith('/account/login');
	const isPasswordPage = request.nextUrl.pathname.startsWith(
		'/account/forgot-password'
	);
	const isRegisterPage =
		request.nextUrl.pathname.startsWith('/account/register');

		if((isLoginPage || isPasswordPage || isRegisterPage) && isAuthenticated(request)) {
			return NextResponse.redirect(new URL('/account', request.url));
		}

		if (!(isLoginPage || isPasswordPage || isRegisterPage) && !isAuthenticated(request)) {
			return NextResponse.redirect(new URL('/account/login', request.url));
		}
}
