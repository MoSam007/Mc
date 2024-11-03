import express from 'express';
import { getAllListings, getListingById, createListing } from '../controllers/listingControllers';
import multer from 'multer';

// Configure multer storage for image uploads
const storage = multer.diskStorage({
  destination: 'uploads/', 
  filename: (_req: any, file: { originalname: any; }, cb: (arg0: null, arg1: string) => void) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.post('/', upload.array('images', 5), createListing);  // Allow up to 5 images per listing

export default router;
