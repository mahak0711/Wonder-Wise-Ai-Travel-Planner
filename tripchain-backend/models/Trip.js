import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  location: {
    type: String,
    required: true
  },
  days: {
    type: Number,
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  travelCompanions: {
    type: Number,
    required: true
  },
  itinerary: [{
    day: Number,
    activities: [String],
    accommodations: String,
    meals: [String]
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('Trip', tripSchema);
