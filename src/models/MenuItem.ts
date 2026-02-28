import mongoose, { Schema, Document } from 'mongoose';

export interface IMenuItem extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietaryTags: string[];
  ingredients: string[];
  nutritionalInfo?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  sizes?: { name: string; price: number }[];
  available: boolean;
  featured: boolean;
  createdAt: Date;
}

const MenuItemSchema = new Schema<IMenuItem>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String, required: true },
    dietaryTags: [{ type: String }],
    ingredients: [{ type: String }],
    nutritionalInfo: {
      calories: Number,
      protein: Number,
      carbs: Number,
      fat: Number,
    },
    sizes: [{ name: String, price: Number }],
    available: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.MenuItem || mongoose.model<IMenuItem>('MenuItem', MenuItemSchema);
