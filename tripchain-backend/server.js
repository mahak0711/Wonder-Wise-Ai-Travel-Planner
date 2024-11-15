import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import tripsRouter from './routes/trips.js';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Trip from './models/Trip.js';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Routes
app.use('/api/trips', tripsRouter);

// Direct trip generation endpoint
app.post('/api/trips/generate', async (req, res) => {
  try {
    // Log the entire request body
    console.log('Received request body:', req.body);

    // Destructure with default values to prevent undefined
    const { prompt = '', userId = '', tripDetails = {} } = req.body;

    // Detailed validation logging
    console.log('Validation check:', {
      hasPrompt: Boolean(prompt),
      hasUserId: Boolean(userId),
      hasTripDetails: Boolean(tripDetails && Object.keys(tripDetails).length),
      promptLength: prompt?.length,
      userIdValue: userId,
      tripDetailsKeys: Object.keys(tripDetails)
    });

    // Validate required fields
    if (!prompt || !userId || !tripDetails) {
      return res.status(400).json({
        error: 'Missing required fields',
        details: {
          hasPrompt: Boolean(prompt),
          hasUserId: Boolean(userId),
          hasTripDetails: Boolean(tripDetails && Object.keys(tripDetails).length)
        }
      });
    }

    // Destructure trip details with default values
    const {
      location = '',
      days = 0,
      budgetCategory = '',
      travelGroup = ''
    } = tripDetails;

    // Validate trip details
    if (!location || !days || !budgetCategory || !travelGroup) {
      return res.status(400).json({
        error: 'Missing trip details',
        details: {
          hasLocation: Boolean(location),
          hasDays: Boolean(days),
          hasBudgetCategory: Boolean(budgetCategory),
          hasTravelGroup: Boolean(travelGroup),
          receivedValues: { location, days, budgetCategory, travelGroup }
        }
      });
    }

    // Initialize Gemini AI
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    console.log('Generating content with prompt:', prompt.substring(0, 100) + '...');
    
    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Generated text length:', text.length);

    // Parse the generated text
    const itinerary = {
      introduction: text.split('\n\n')[0],
      days: text.split('Day').slice(1).map(day => {
        const sections = day.split('\n').filter(line => line.trim());
        return {
          morning: sections.filter(s => s.toLowerCase().includes('morning')),
          lunch: sections.find(s => s.toLowerCase().includes('lunch')) || '',
          afternoon: sections.filter(s => s.toLowerCase().includes('afternoon')),
          dinner: sections.find(s => s.toLowerCase().includes('dinner')) || '',
          evening: sections.filter(s => s.toLowerCase().includes('evening')),
          accommodation: sections.find(s => s.toLowerCase().includes('accommodation')) || ''
        };
      }),
      tips: text.split('Travel Tips:')[1]?.split('\n').filter(tip => tip.trim()) || []
    };

    // Create new trip document
    const trip = new Trip({
      user: userId,
      location,
      days: parseInt(days),
      budgetCategory,
      travelGroup,
      itinerary
    });

    // Save to database
    await trip.save();
    console.log('Trip saved with ID:', trip._id);

    // Send success response
    res.json({
      success: true,
      trip,
      itinerary
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Failed to generate trip',
      message: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
