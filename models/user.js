const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  foodPreferences: [String],
  dietaryRestrictions: [String],
  transportPreferences: [String],
  activityPreferences: [String],
  interests: [String],  // New field for user interests
  budgetRatio: {
    food: { type: Number, default: 50 },
    activities: { type: Number, default: 50 },
    // Add more categories as needed
  },
  tripDuration: { type: Number, required: true },  // New field for trip duration
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
module.exports = User;



