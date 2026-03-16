const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const carRoutes = require('./routes/carRoutes');

const app = express();

app.use(cors());
app.use(express.json());

// Global Rate Limiter - 100 requests per 15 minutes
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100,
  message: 'Too many requests from this IP, please try again after 15 minutes.'
});
app.use('/api', globalLimiter);

// Specific Strict Limiter for AI Generation Endpoint - 10 requests per 15 minutes
const aiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: 'Too many AI recommendations generated from this IP, please try again after 15 minutes.'
});
app.use('/api/cars/recommend', aiLimiter);

// Routes
app.use('/api/cars', carRoutes);

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ai-car-recommendation';

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB database');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
