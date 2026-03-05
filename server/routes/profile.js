'use strict';

const router = require('express').Router();
const Student = require('../models/Student');

// POST /api/profile — upsert student on first login with CIAM claims
router.post('/', async (req, res) => {
  const { userId, displayName, email, grade } = req.body;
  if (!userId) return res.status(400).json({ message: 'userId is required' });

  try {
    const student = await Student.findOneAndUpdate(
      { userId },
      { displayName, email, updatedAt: new Date(), ...(grade && { grade }) },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(student);
  } catch (err) {
    console.error('[profile] POST error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/profile/:userId
router.get('/:userId', async (req, res) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: 'Profile not found' });
    res.json(student);
  } catch (err) {
    console.error('[profile] GET error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
