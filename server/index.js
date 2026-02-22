'use strict';

const express = require('express');
const path = require('path');
const cors = require('cors');
const helmet = require('helmet');

const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 8080;
const IS_PROD = process.env.NODE_ENV === 'production';

// ---------------------------------------------------------------------------
// Security headers
// ---------------------------------------------------------------------------
app.use(
  helmet({
    // CSP is configured at the React level via meta tags; disable Helmet's
    // default CSP so it doesn't block the app's own scripts/styles.
    contentSecurityPolicy: false,
  })
);

// ---------------------------------------------------------------------------
// CORS — open in dev, locked to the App Service origin in production
// ---------------------------------------------------------------------------
app.use(
  cors({
    origin: IS_PROD
      ? process.env.ALLOWED_ORIGIN || false // set ALLOWED_ORIGIN app setting if needed
      : '*',
  })
);

// ---------------------------------------------------------------------------
// Body parsing
// ---------------------------------------------------------------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ---------------------------------------------------------------------------
// API routes  →  /api/*
// ---------------------------------------------------------------------------
app.use('/api', apiRoutes);

// ---------------------------------------------------------------------------
// Static React build  →  /build (produced by `npm run build` at project root)
// ---------------------------------------------------------------------------
const buildPath = path.join(__dirname, '..', 'build');
app.use(express.static(buildPath));

// Catch-all: hand off unknown routes to React's client-side router
app.get('*', (_req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------
app.listen(PORT, () => {
  console.log(`[server] Running on port ${PORT} (${IS_PROD ? 'production' : 'development'})`);
});
