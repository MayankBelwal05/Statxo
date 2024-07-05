// app.js

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const recordRoutes = require('./routes/recordRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const connectDB = async () => {
    try {
      await mongoose.connect('mongodb+srv://mbelwal05:mbelwal05@cluster0.xdewbhu.mongodb.net/statxoApp?retryWrites=true&w=majority&appName=Cluster0');
      console.log('MongoDB connected');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };
  

connectDB();

// Routes
app.use('/api', recordRoutes);

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;