import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose';

interface CustomJWTPayload extends JWTPayload {
  userId: string;
  isStaff: boolean;
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  if (!token) {
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('token', '', { maxAge: -1 });
    return response;
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret) as { payload: CustomJWTPayload };

    req.nextUrl.searchParams.set('isStaff', payload.isStaff.toString());
    req.nextUrl.searchParams.set('userId', payload.userId);

    return NextResponse.next();
  } catch (error) {
    console.error('Token verification failed, redirecting to login:', error);
    const response = NextResponse.redirect(new URL('/login', req.url));
    response.cookies.set('token', '', { maxAge: -1 });
    return response;
  }
}

export const config = {
  matcher: ['/protected/:path*', '/add-event'],
};