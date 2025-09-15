import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request) {
  const { pathname } = request.nextUrl;
  
  console.log(' Middleware: Processing request for:', pathname);

  // Allow access to public routes
  if (
    pathname === '/login' || 
    pathname === '/unauthorized' || 
    pathname === '/' ||
    pathname.startsWith('/api/auth') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon')
  ) {
    console.log(' Middleware: Public route allowed:', pathname);
    return NextResponse.next();
  }

  // Get the token from the request
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET 
  });

  console.log(' Middleware: Token status:', token ? 'Found' : 'Not found');
  if (token) {
    console.log(' Middleware: User role:', token.role, 'ID:', token.userId);
  }

  // Protected routes that require authentication
  if (pathname.startsWith('/dashboard')) {
    if (!token) {
      console.log(' Middleware: No token, redirecting to unauthorized');
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    console.log(' Middleware: Token found, allowing dashboard access');
    return NextResponse.next();
  }

  console.log(' Middleware: Default - allowing access to:', pathname);
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\.png$|.*\\.jpg$|.*\\.svg$).*)',
  ],
};
