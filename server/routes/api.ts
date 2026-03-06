import { Router, Request, Response } from 'express';
import profileRouter    from './profile';
import milestonesRouter from './milestones';
import progressRouter   from './progress';
import dashboardRouter  from './dashboard';
import summaryRouter    from './summary';

const router = Router();

// Health check — used by App Service health probes and CI smoke tests
router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

router.use('/profile',    profileRouter);
router.use('/milestones', milestonesRouter);
router.use('/progress',   progressRouter);
router.use('/dashboard',  dashboardRouter);
router.use('/summary',    summaryRouter);

export default router;
