import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  user?: mongoose.Types.ObjectId;
  items: {
    menuItem: {
      _id: string;
      name: string;
      price: number;
      image: string;
    };
    quantity: number;
    size?: string;
  }[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  status: 'received' | 'preparing' | 'ready' | 'out_for_delivery' | 'delivered';
  deliveryAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
  deliveryType: 'delivery' | 'pickup';
  paymentMethod: string;
  promoCode?: string;
  orderNumber: string;
  createdAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    items: [
      {
        menuItem: {
          _id: String,
          name: String,
          price: Number,
          image: String,
        },
        quantity: Number,
        size: String,
      },
    ],
    subtotal: { type: Number, required: true },
    tax: { type: Number, required: true },
    deliveryFee: { type: Number, required: true },
    total: { type: Number, required: true },
    status: {
      type: String,
      enum: ['received', 'preparing', 'ready', 'out_for_delivery', 'delivered'],
      default: 'received',
    },
    deliveryAddress: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
    },
    deliveryType: { type: String, enum: ['delivery', 'pickup'], required: true },
    paymentMethod: { type: String, required: true },
    promoCode: { type: String },
    orderNumber: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);
