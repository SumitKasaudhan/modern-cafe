import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Reservation from '@/models/Reservation';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const reservation = await Reservation.findById(params.id);
    if (!reservation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(reservation);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch reservation' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await request.json();
    const reservation = await Reservation.findByIdAndUpdate(params.id, body, { new: true });
    if (!reservation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(reservation);
  } catch {
    return NextResponse.json({ error: 'Failed to update reservation' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const reservation = await Reservation.findByIdAndDelete(params.id);
    if (!reservation) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: 'Failed to delete reservation' }, { status: 500 });
  }
}
