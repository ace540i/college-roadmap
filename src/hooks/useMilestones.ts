import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../auth/AuthContext';
import { IMilestone } from '../types/api';

const API = process.env.REACT_APP_API_BASE_URL || '';

export function useMilestones(grade: number) {
  const { user } = useAuth();
  const [milestones, setMilestones] = useState<IMilestone[]>([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;

    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`${API}/api/milestones/${grade}`).then(r => r.json()),
      fetch(`${API}/api/progress/${user.localAccountId}`).then(r => r.json()),
    ])
      .then(([catalog, progress]) => {
        const completedIds = new Set<string>(
          (progress as Array<{ taskId: string; completed: boolean }>)
            .filter(p => p.completed)
            .map(p => p.taskId)
        );
        setMilestones(
          (catalog as IMilestone[]).map(m => ({
            ...m,
            tasks: m.tasks.map(t => ({ ...t, completed: completedIds.has(t.taskId) })),
          }))
        );
      })
      .catch(err => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [grade, user]);

  const toggleTask = useCallback(
    async (taskId: string, currentCompleted: boolean) => {
      if (!user) return;

      // Optimistic update
      setMilestones(prev =>
        prev.map(m => ({
          ...m,
          tasks: m.tasks.map(t =>
            t.taskId === taskId ? { ...t, completed: !currentCompleted } : t
          ),
        }))
      );

      try {
        await fetch(`${API}/api/progress`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            userId:    user.localAccountId,
            taskId,
            completed: !currentCompleted,
          }),
        });
      } catch {
        // Roll back on error
        setMilestones(prev =>
          prev.map(m => ({
            ...m,
            tasks: m.tasks.map(t =>
              t.taskId === taskId ? { ...t, completed: currentCompleted } : t
            ),
          }))
        );
      }
    },
    [user]
  );

  return { milestones, loading, error, toggleTask };
}
