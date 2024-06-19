import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import Event from '../../../lib/db/models/events.models';
import connectToDatabase from '../../../lib/db';

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET));

    const {
      title,
      description,
      location,
      imageUrl,
      startDateTime,
      endDateTime,
      price,
      capacity,
      isFree,
      url,
      category,
    } = await req.json();

    const newEvent = new Event({
      title,
      description,
      location,
      imageUrl,
      startDateTime,
      endDateTime,
      price,
      capacity,
      isFree,
      url,
      category,
      organizer: payload.userId, 
    });

    await newEvent.save();

    return NextResponse.json({ message: 'Event created successfully' }, { status: 201 });
  } catch (error) {
    console.error('Event creation error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}