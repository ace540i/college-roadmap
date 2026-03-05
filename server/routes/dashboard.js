'use strict';

const router = require('express').Router();
const Student = require('../models/Student');
const MilestoneCatalog = require('../models/MilestoneCatalog');
const Progress = require('../models/Progress');

// GET /api/dashboard/:userId
// Returns student profile + milestone catalog + progress summary for their grade
router.get('/:userId', async (req, res) => {
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
      milestones: milestones.map(m => ({
        ...m.toObject(),
        tasks: m.tasks.map(t => ({
          ...t,
          completed: completedTaskIds.has(t.taskId),
        })),
      })),
    });
  } catch (err) {
    console.error('[dashboard] GET error:', err.message);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
