import 'dotenv/config';
import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';

import { connectDB } from './db';
import apiRoutes from './routes/api';

const app = express();
const PORT = process.env.PORT || 8080;
const IS_PROD = process.env.NODE_ENV === 'production';

// ---------------------------------------------------------------------------
// Security headers
// ---------------------------------------------------------------------------
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// ---------------------------------------------------------------------------
// CORS — open in dev, locked to the App Service origin in production
// ---------------------------------------------------------------------------
app.use(
  cors({
    origin: IS_PROD
      ? process.env.ALLOWED_ORIGIN || false
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
// ts-node: __dirname = server/  → ../build = project root/build
// compiled: __dirname = server/dist/ → ../../build = project root/build
const buildPath = path.join(__dirname, process.env.NODE_ENV === 'production' ? '../..' : '..', 'build');
app.use(express.static(buildPath));

// Catch-all: hand off unknown routes to React's client-side router
app.get('*', (_req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// ---------------------------------------------------------------------------
// Start — connect to DB then begin listening
// ---------------------------------------------------------------------------
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`[server] Running on port ${PORT} (${IS_PROD ? 'production' : 'development'})`);
    });
  })
  .catch(err => {
    console.error('[server] Failed to connect to database:', (err as Error).message);
    process.exit(1);
  });
