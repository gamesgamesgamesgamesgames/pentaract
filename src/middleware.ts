import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
	const isAuthenticated = request.cookies.get('qs_authenticated')

	if (!isAuthenticated) {
		return NextResponse.redirect(new URL('/login', request.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: '/dashboard/:path*',
}
