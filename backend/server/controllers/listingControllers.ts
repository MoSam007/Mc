import { Request, Response } from 'express';
import Listing from '../models/listings';
import mongoose from 'mongoose';

export const getAllListings = async (req: Request, res: Response) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const getListingById = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    // Validate if id is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid Listing ID' });
    }

    const listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: 'Listing not found' });
    }
    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createListing = async (req: Request, res: Response) => {
  try {
    // Handle multiple file uploads
    const imageUrls = (req.files as Express.Multer.File[])?.map((file) => `/uploads/${file.filename}`) || [];
    
    const newListing = new Listing({ 
      ...req.body, 
      imageUrls 
    });

    const savedListing = await newListing.save();
    res.status(201).json(savedListing);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};