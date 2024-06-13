

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; 

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('token', '', { maxAge: -1 });
    return response;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    const isStaff = payload.isStaff;
    if (!isStaff && req.nextUrl.pathname === '/add-event') {
      return NextResponse.redirect(new URL('/unauthorized', req.url));
    }
    
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed, redirecting to login:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/protected/:path*', '/add-event'],
};
