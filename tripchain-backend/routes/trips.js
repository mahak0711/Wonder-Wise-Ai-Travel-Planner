import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Trip from '../models/Trip.js';

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/generate', async (req, res) => {
  try {
    // Log the entire request body for debugging
    console.log('Received request body:', req.body);

    const { prompt, userId, tripDetails } = req.body;

    // Validate required fields with detailed error messages
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }
    if (!userId) {
      return res.status(400).json({ error: 'User ID is required' });
    }
    if (!tripDetails) {
      return res.status(400).json({ error: 'Trip details are required' });
    }

    const { location, days, budgetCategory, travelGroup } = tripDetails;

    // Validate trip details with specific error messages
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }
    if (!days || isNaN(days)) {
      return res.status(400).json({ error: 'Valid number of days is required' });
    }
    if (!budgetCategory) {
      return res.status(400).json({ error: 'Budget category is required' });
    }
    if (!travelGroup) {
      return res.status(400).json({ error: 'Travel group is required' });
    }

    // Validate budget category
    const validBudgetCategories = ['cheap', 'moderate', 'luxury'];
    if (!validBudgetCategories.includes(budgetCategory)) {
      return res.status(400).json({
        error: 'Invalid budget category',
        validOptions: validBudgetCategories,
        received: budgetCategory
      });
    }

    // Validate travel group
    const validTravelGroups = ['solo', 'couple', 'family', 'friends'];
    if (!validTravelGroups.includes(travelGroup)) {
      return res.status(400).json({
        error: 'Invalid travel group',
        validOptions: validTravelGroups,
        received: travelGroup
      });
    }

    // Generate content using Gemini
    console.log('Generating content with prompt:', prompt);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

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

    // Create and save the trip
    const trip = new Trip({
      user: userId,
      location,
      days: parseInt(days),
      budgetCategory,
      travelGroup,
      itinerary
    });

    await trip.save();
    console.log('Trip saved successfully:', trip._id);

    res.json({
      success: true,
      trip: trip
    });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({
      error: 'Failed to generate trip',
      message: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

export default router;
