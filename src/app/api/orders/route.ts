import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Order from '@/models/Order';
import { generateOrderNumber, calculateTax, calculateDeliveryFee } from '@/lib/utils';

export async function GET() {
  try {
    await connectDB();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return NextResponse.json(orders);
  } catch {
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const body = await request.json();
    const subtotal = body.items.reduce(
      (sum: number, item: { menuItem: { price: number }; quantity: number }) =>
        sum + item.menuItem.price * item.quantity,
      0
    );
    const tax = calculateTax(subtotal);
    const deliveryFee = body.deliveryType === 'delivery' ? calculateDeliveryFee(subtotal) : 0;
    const total = subtotal + tax + deliveryFee;

    const order = await Order.create({
      ...body,
      subtotal,
      tax,
      deliveryFee,
      total,
      orderNumber: generateOrderNumber(),
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
