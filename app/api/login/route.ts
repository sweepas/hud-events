import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import User from '../../../lib/db/models/users.model';
import connectToDatabase from '../../../lib/db';

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { email, password } = await req.json();

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const token = await new SignJWT({ userId: user._id.toString() })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('1h')
      .sign(secret);

    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
