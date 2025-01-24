const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authenticate = require('../middleware/auth');
const router = express.Router();
const SECRET_KEY = '4bcd76&zP9TtD$3e!rMv@7XvRrVgV8UqcL!';

// User SignIn
router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Received login request:', { email, password });

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found for email:', email);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Compare passwords
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            console.log('Password mismatch for email:', email);
            return res.status(400).json({ error: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET_KEY, {
            expiresIn: '1h',
        });
        res.status(200).json({ message: 'Login successful',  user});
    } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Failed to log in user' });
}
});



// Get user profile
router.get('/profile', authenticate, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch profile' });
    }
});

module.exports = router;
