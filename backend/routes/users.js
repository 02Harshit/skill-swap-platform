// backend/routes/users.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');

// GET /api/users — list all public profiles
router.get('/', async (req, res) => {
  try {
    const users = await User.find({ isProfileComplete: true }).select('-password');
    res.json({ users });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /api/users/:id/request — send swap request
router.post('/:id/request', authMiddleware, async (req, res) => {
  const fromUser = req.user.userId;
  const toUser = req.params.id;
  // Implement storing requests—simplest alert for now:
  return res.json({ message: 'Swap request sent!' });
});

module.exports = router;
