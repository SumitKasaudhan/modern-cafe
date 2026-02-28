import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  avatar?: string;
  addresses?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  }[];
  createdAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    avatar: { type: String },
    addresses: [
      {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
