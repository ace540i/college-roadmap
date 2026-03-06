import { Router, Request, Response } from 'express';
import Student from '../models/Student';
import MilestoneCatalog from '../models/MilestoneCatalog';
import Progress from '../models/Progress';

const router = Router();

// GET /api/summary/:userId
// Returns completed/total task counts for each grade (9-12) in one call.
router.get('/:userId', async (req: Request, res: Response) => {
  try {
    const student = await Student.findOne({ userId: req.params.userId });
    if (!student) return res.status(404).json({ message: 'Profile not found' });

    const grades = [9, 10, 11, 12];

    const [allMilestones, progressRecords] = await Promise.all([
      MilestoneCatalog.find({ grade: { $in: grades } }),
      Progress.find({ studentId: student._id, completed: true }),
    ]);

    const completedTaskIds = new Set(progressRecords.map(p => p.taskId));

    const summary = grades.map(grade => {
      const milestones  = allMilestones.filter(m => m.grade === grade);
      const totalTasks  = milestones.reduce((s, m) => s + m.tasks.length, 0);
      const completedTasks = milestones.reduce(
        (s, m) => s + m.tasks.filter(t => completedTaskIds.has(t.taskId)).length,
        0
      );
      return {
        grade,
        completedTasks,
        totalTasks,
        percent: totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0,
      };
    });

    res.json(summary);
  } catch (err) {
    console.error('[summary] GET error:', (err as Error).message);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
