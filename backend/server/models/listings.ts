import mongoose, { Document } from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  amenities: {
    type: [String],
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  imageUrls: {
    type: [String],
    required: true,
  },
});

export interface IListing extends Document {
  title: string;
  location: string;
  description: string;
  price: string;
  rating: number;
  imageUrls: string[];
  amenities: string[];
}

const Listing = mongoose.model<IListing>('Listing', listingSchema);

export default Listing;
