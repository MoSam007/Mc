import { Request } from 'express';
import express from 'express';
import { getAllListings, getListingById, createListing } from '../controllers/listingControllers';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req: Request, file: any, cb: (arg0: null, arg1: string) => void) => {
    cb(null, path.join(__dirname, '../../uploads')); // Adjusted path
  },
  filename: (_req: any, file: { originalname: any; }, cb: (arg0: null, arg1: string) => void) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', getAllListings);
router.get('/:id', getListingById);
router.post('/', upload.array('images', 5), createListing); 

export default router;
