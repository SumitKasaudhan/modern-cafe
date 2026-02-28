import mongoose, { Schema, Document } from 'mongoose';

export interface IReservation extends Document {
  user?: mongoose.Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  date: Date;
  time: string;
  partySize: number;
  occasion?: string;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt: Date;
}

const ReservationSchema = new Schema<IReservation>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    partySize: { type: Number, required: true },
    occasion: { type: String },
    specialRequests: { type: String },
    status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.models.Reservation || mongoose.model<IReservation>('Reservation', ReservationSchema);
