'use strict';

const router = require('express').Router();
const MilestoneCatalog = require('../models/MilestoneCatalog');

// GET /api/milestones/:grade — returns catalog for a given grade (9-12)
router.get('/:grade', async (req, res) => {
  const grade = parseInt(req.params.grade, 10);
  if (![9, 10, 11, 12].includes(grade)) {
    return res.status(400).json({ message: 'Grade must be 9, 10, 11, or 12' });
  }
  try {
    const milestones = await MilestoneCatalog.find({ grade }).sort('order');
    res.json(milestones);
  } catch (err) {
    console.error('[milestones] GET error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
