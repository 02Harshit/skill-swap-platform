const express = require('express');
const router = express.Router();
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware.js');

router.post('/', authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;

    await User.findByIdAndUpdate(userId, {
      ...req.body,
      isProfileComplete: true,
    });

    res.status(200).json({ message: 'Profile saved successfully' });
  } catch (err) {
    console.error('Profile save error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
