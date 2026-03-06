import { Router, Request, Response } from 'express';
import Student from '../models/Student';

const router = Router();

// POST /api/profile — upsert student on login or profile save
router.post('/', async (req: Request, res: Response) => {
  const { userId, displayName, email, grade, firstName, middleName, lastName, state } = req.body as {
    userId?: string; displayName?: string; email?: string; grade?: number;
    firstName?: string; middleName?: string; lastName?: string; state?: string;
  };
  if (!userId) return res.status(400).json({ message: 'userId is required' });

  const update: Record<string, unknown> = { updatedAt: new Date() };
  if (displayName  !== undefined) update.displayName  = displayName;
  if (email        !== undefined) update.email        = email;
  if (firstName    !== undefined) update.firstName    = firstName;
  if (middleName   !== undefined) update.middleName   = middleName;
  if (lastName     !== undefined) update.lastName     = lastName;
  if (state        !== undefined) update.state        = state;
  if (grade        !== undefined) update.grade        = grade;

  try {
    const student = await Student.findOneAndUpdate(
      { userId },
      update,
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.json(student);
  } catch (err) {
    console.error('[profile] POST error:', (err as Error).message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/profile/:userId
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: 'Profile not found' });
    res.json(student);
  } catch (err) {
    console.error('[profile] GET error:', (err as Error).message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
