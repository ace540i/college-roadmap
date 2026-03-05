'use strict';

const router = require('express').Router();

// Health check — used by App Service health probes and CI smoke tests
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/profile',    require('./profile'));
router.use('/milestones', require('./milestones'));
router.use('/progress',   require('./progress'));
router.use('/dashboard',  require('./dashboard'));

module.exports = router;
