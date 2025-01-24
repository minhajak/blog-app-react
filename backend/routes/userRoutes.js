const express = require('express');
const User = require('../models/user');
const router = express.Router();

// Add a new user
router.post('/add-user', async (req, res) => {
  try {
      const { username, age, gender, email, password } = req.body;
      const existingUsername = await User.findOne({ username });
      if (existingUsername) {
          return res.status(400).json({ error: 'Username already exists' });
      }

      const existingUser  = await User.findOne({ email });
      if (existingUser ) {
          return res.status(400).json({ error: 'Email already exists' });
      }

      const newUser  = new User({ username, age, gender, email, password });
      await newUser .save();
      res.status(201).json({ message: 'User  added successfully' });
  } catch (error) {
      res.status(500).json({ error: 'Failed to add user' });
  }
});

// Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// Fetch user by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch user' });
  }
});

// Update a user by ID
router.put('/update-user/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { username, age, gender, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(id, { username, age, gender, email, password }, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User updated successfully', updatedUser });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// Delete a user by username
router.delete('/delete-user/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const deletedUser = await User.findOneAndDelete({ username });
    if (!deletedUser) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

module.exports = router;
