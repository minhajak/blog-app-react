const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes')

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Use Routes
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/blogs', blogRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
