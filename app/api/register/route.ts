import { NextRequest, NextResponse } from 'next/server';
import User from '../../../lib/db/models/users.model';
import connectToDatabase from '../../../lib/db';

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const { email, username, firstName, lastName, photo, isStaff, password } = await req.json();

  try {
    const newUser = new User({
      email,
      username,
      firstName,
      lastName,
      photo,
      isStaff,
      password,
    });

    await newUser.save();
    return NextResponse.json({ message: 'User created successfully' }, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    } else {
      console.error('Error creating user:', error);
      return NextResponse.json({ error: 'Error creating user' }, { status: 500 });
    }
  }
}
