import { Router, Request, Response } from 'express';
import Student from '../models/Student';
import MilestoneCatalog from '../models/MilestoneCatalog';
import Progress from '../models/Progress';

const router = Router();

// POST /api/progress — mark a task complete or incomplete
// Body: { userId, taskId, completed, notes }
router.post('/', async (req: Request, res: Response) => {
  const { userId, taskId, completed, notes } = req.body as {
    userId?: string; taskId?: string; completed?: boolean; notes?: string;
  };
  if (!userId || !taskId) {
    return res.status(400).json({ message: 'userId and taskId are required' });
  }

  try {
    const student = await Student.findOne({ userId });
    if (!student) return res.status(404).json({ message: 'Profile not found' });

    const milestone = await MilestoneCatalog.findOne({ 'tasks.taskId': taskId });
    const task = milestone?.tasks.find(t => t.taskId === taskId);

    const update = {
      completed:      !!completed,
      completedAt:    completed ? new Date() : null,
      grade:          milestone?.grade,
      milestoneTitle: milestone?.title,
      taskTitle:      task?.title,
      ...(notes !== undefined && { notes }),
    };

    const result = await Progress.findOneAndUpdate(
      { studentId: student._id, taskId },
      update,
      { upsert: true, new: true }
    );
    res.json(result);
  } catch (err) {
    console.error('[progress] POST error:', (err as Error).message);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /api/progress/:userId — all progress records for a student
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: 'Profile not found' });

    const records = await Progress.find({ studentId: student._id });
    res.json(records);
  } catch (err) {
    console.error('[progress] GET error:', (err as Error).message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
