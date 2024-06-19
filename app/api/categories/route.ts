

import { NextRequest, NextResponse } from 'next/server';
import Category from '../../../lib/db/models/category.models';
import connectToDatabase from '../../../lib/db';

export async function GET(req: NextRequest) {
  await connectToDatabase();

  try {
    const categories = await Category.find();
    return NextResponse.json(categories, { status: 200 });
  } catch (error) {
    console.error('Error fetching categories:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}