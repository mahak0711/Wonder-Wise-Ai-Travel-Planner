import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true,
    min: 1
  },
  budgetCategory: {
    type: String,
    enum: ['cheap', 'moderate', 'luxury'],
    required: true
  },
  travelGroup: {
    type: String,
    enum: ['solo', 'couple', 'family', 'friends'],
    required: true
  },
  itinerary: {
    introduction: String,
    days: [{
      morning: [String],
      lunch: String,
      afternoon: [String],
      dinner: String,
      evening: [String],
      accommodation: String
    }],
    tips: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Trip', tripSchema);
