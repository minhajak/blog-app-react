const mongoose = require('mongoose');

const connectDB = () => {
  const uri = 'mongodb://localhost:27017/blog';
  mongoose.connect(uri)
    .then(() => console.log('MongoDB Connected to blog database'))
    .catch(err => console.error('MongoDB Connection Error:', err));
};

module.exports = { connectDB };
