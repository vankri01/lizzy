const express = require('express');
const axios = require('axios');
const User = require('../models/user');

const router = express.Router();

// Function to fetch weather data
const getWeatherData = async (location) => {
  const apiKey = process.env.WEATHER_API_KEY;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};

// POST route to generate itinerary
router.post('/generate', async (req, res) => {
  const { name, email, destination, travelDates, tripDuration, interests, budgetRatio } = req.body;

  try {
    // Fetch user's preferences from the database
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch weather data for the destination
    const weatherData = await getWeatherData(destination);
    if (!weatherData || !weatherData.weather) {
      return res.status(500).json({ message: 'Error fetching weather data' });
    }

    const weatherDescription = weatherData.weather[0]?.description || 'clear';

    // Avoid outdoor activities if it rains
    const filteredActivities = weatherDescription.includes('rain')
      ? user.activityPreferences.filter(activity => activity !== 'outdoor')
      : user.activityPreferences;

    // Calculate budget allocation based on user preferences
    const totalBudget = 100; // Example total budget
    const budget = {
      food: (budgetRatio.food / 100) * totalBudget,
      activities: (budgetRatio.activities / 100) * totalBudget,
      // Add more categories as needed
    };

    // Generate itinerary based on preferences, weather, and trip duration
    const itinerary = {
      destination,
      travelDates,
      tripDuration,
      activities: filteredActivities,
      foodPreferences: user.foodPreferences,
      interests: interests || user.interests,
      weather: weatherData,
      budget,
    };

    res.json(itinerary);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;





