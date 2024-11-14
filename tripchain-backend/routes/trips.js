import express from 'express';
import Trip from '../models/Trip.js';
import { generateTripItinerary } from '../services/geminiService.js';

const router = express.Router();

// Generate new trip
router.post('/generate', async (req, res) => {
  try {
    const { location, days, budget, travelCompanions, userId } = req.body;
    
    // Generate itinerary using Gemini AI
    const itinerary = await generateTripItinerary({
      location,
      days,
      budget,
      travelCompanions
    });

    // Save trip to database
    const trip = new Trip({
      user: userId,
      location,
      days,
      budget,
      travelCompanions,
      itinerary
    });

    await trip.save();
    res.json(trip);
  } catch (error) {
    console.error('Error generating trip:', error);
    res.status(500).json({ error: 'Failed to generate trip' });
  }
});

// Get user's trips
router.get('/user/:userId', async (req, res) => {
  try {
    const trips = await Trip.find({ user: req.params.userId });
    res.json(trips);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch trips' });
  }
});

export default router;
