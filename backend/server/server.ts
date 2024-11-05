import express from 'express';
import app from './app';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import listingRoutes from './routes/listingRoutes';
import path from 'path';

dotenv.config();
connectDB();

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));



app.use('/api/listings', listingRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

app.use(cors({
  origin: 'http://localhost:3000',  
}));


