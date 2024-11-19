import mongoose, { Document } from 'mongoose';

interface UserDocument extends Document {
  email: string;
  password: string;
  wishlist: number[]; // Array of listing IDs
}

const userSchema = new mongoose.Schema<UserDocument>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [{ type: Number }],
});

export default mongoose.model<UserDocument>('User', userSchema);
