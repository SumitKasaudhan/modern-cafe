import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

export async function GET() {
  try {
    await connectDB();
    const reservations = await Reservation.find().sort({ date: 1 }).lean();
    return NextResponse.json(reservations);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch reservations' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const reservation = await Reservation.create(body);
    return NextResponse.json(reservation, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create reservation' }, { status: 500 });
  }
}
