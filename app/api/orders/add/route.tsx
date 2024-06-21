import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/db';
import Order from '../../../../lib/db/models/order.model';
import { z } from 'zod';

const schema = z.object({
  userId: z.string(),
  eventId: z.string(),
  eventInfo: z.object({
    date: z.string().optional(),
    isFree: z.boolean().optional(),
    price: z.string().optional(),
    title: z.string().optional(),
  }),
});

export async function POST(req: NextRequest) {
  await connectToDatabase();

  const body = await req.json();
  console.log('Request Body:', body);

  const result = schema.safeParse(body);
  console.log(result);

  if (!result.success) {
    console.log('Validation Error:', result.error.errors);
    return NextResponse.json(
      { success: false, message: 'Missing required fields' },
      { status: 400 }
    );
  }

  const { userId, eventId, eventInfo } = result.data;

  try {
    const newOrder = new Order({
      userId,
      eventId,
      eventInfo: {
        ...eventInfo,
        date: eventInfo.date ? new Date(eventInfo.date) : undefined,
        price: eventInfo.price ? parseFloat(eventInfo.price) : undefined,
      },
    });
    await newOrder.save();
    return NextResponse.json(
      { success: true, data: newOrder },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Failed to create order',
        error: error,
      },
      { status: 500 }
    );
  }
}
