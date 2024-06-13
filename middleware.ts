// middleware.ts

import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose'; 

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    await jwtVerify(token, secret);
    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed, redirecting to login:', error);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/protected/:path*', '/add-event'], // Ensure you protect the /add-event route
};
