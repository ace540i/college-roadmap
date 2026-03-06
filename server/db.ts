import mongoose from 'mongoose';

export async function connectDB(): Promise<void> {
  const uri = process.env.DATABASE_URL;
  if (!uri) {
    console.warn('[db] DATABASE_URL not set — skipping database connection');
    return;
  }
  await mongoose.connect(uri);
  console.log('[db] Connected to Cosmos DB (MongoDB API)');
}
