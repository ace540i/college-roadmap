import { Router, Request, Response } from 'express';
import Student from '../models/Student';
import MilestoneCatalog from '../models/MilestoneCatalog';
import Progress from '../models/Progress';

const router = Router();

// GET /api/dashboard/:userId
// Returns student profile + milestone catalog + progress summary for their grade
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: 'Profile not found' });

    const [milestones, progressRecords] = await Promise.all([
      MilestoneCatalog.find({ grade: student.grade }).sort('order'),
      Progress.find({ studentId: student._id }),
    ]);

    const completedTaskIds = new Set(
      progressRecords.filter(p => p.completed).map(p => p.taskId)
    );

    const totalTasks     = milestones.reduce((sum, m) => sum + m.tasks.length, 0);
    const completedTasks = completedTaskIds.size;

    res.json({
      student,
      grade: student.grade,
      summary: {
        totalTasks,
        completedTasks,
        percent: totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0,
      },
      milestones: milestones.map(m => {
        const obj = m.toObject();
        return {
          ...obj,
          tasks: obj.tasks.map(t => ({
            ...t,
            completed: completedTaskIds.has(t.taskId),
          })),
        };
      }),
    });
  } catch (err) {
    console.error('[dashboard] GET error:', (err as Error).message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
