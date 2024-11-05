import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db';
import listingRoutes from './routes/listingRoutes';
import { errorHandler, notFound } from './middleware/errorHandler';

dotenv.config();

const app = express();
connectDB();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',  // Frontend URL
}));
app.use(express.json());

// Root Route
app.get('/', (req, res) => {
  res.send('API is running...');
});

// Routes
app.use('/api/listings', listingRoutes);

// Serve static files (e.g., images)
app.use('/uploads', express.static('uploads'));

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

export default app;
