const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const itineraryRoutes = require('./routes/itineraryRoutes');
const cors = require('cors');

// Initialize the app variable
const app = express();

// Middleware
app.use(cors());  // Enable CORS
app.use(express.json());  // Middleware to parse incoming JSON

// Serve static files
app.use(express.static('public'));

// Routes
app.use('/api/itinerary', itineraryRoutes);
// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch((error) => console.log(error));


// Set up the server to listen on the correct port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



