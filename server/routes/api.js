'use strict';

const router = require('express').Router();

// ---------------------------------------------------------------------------
// Health check — used by App Service health probes and CI smoke tests
// ---------------------------------------------------------------------------
router.get('/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ---------------------------------------------------------------------------
// TODO: Add your API routes below
//
// Examples:
//   router.get('/roadmap',        roadmapController.list);
//   router.get('/roadmap/:grade', roadmapController.getByGrade);
// ---------------------------------------------------------------------------

module.exports = router;
