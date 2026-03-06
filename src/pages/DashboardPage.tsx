import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';
import MilestoneSection from '../components/MilestoneSection';
import { IGradeSummary, IMilestone } from '../types/api';

const API = process.env.REACT_APP_API_BASE_URL || '';

interface IDashboardData {
  grade:     number;
  summary:   { totalTasks: number; completedTasks: number; percent: number };
  milestones: IMilestone[];
}

const GRADE_LABELS: Record<number, { title: string; link: string }> = {
  9:  { title: '9th Grade',  link: '/grade-9'  },
  10: { title: '10th Grade', link: '/grade-10' },
  11: { title: '11th Grade', link: '/grade-11' },
  12: { title: '12th Grade', link: '/grade-12' },
};

const DashboardPage: React.FC = () => {
  const { user } = useAuth();

  const [summary,       setSummary]       = useState<IGradeSummary[]>([]);
  const [dashboard,     setDashboard]     = useState<IDashboardData | null>(null);
  const [loading,       setLoading]       = useState(true);
  const [error,         setError]         = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    setError(null);

    Promise.all([
      fetch(`${API}/api/summary/${user.localAccountId}`).then(r => r.json()),
      fetch(`${API}/api/dashboard/${user.localAccountId}`).then(r => r.json()),
    ])
      .then(([summaryData, dashData]) => {
        setSummary(summaryData);
        setDashboard(dashData);
      })
      .catch(err => setError((err as Error).message))
      .finally(() => setLoading(false));
  }, [user]);

  const toggleTask = useCallback(
    async (taskId: string, currentCompleted: boolean) => {
      if (!user || !dashboard) return;

      // Optimistic update
      setDashboard(prev => prev ? {
        ...prev,
        milestones: prev.milestones.map(m => ({
          ...m,
          tasks: m.tasks.map(t =>
            t.taskId === taskId ? { ...t, completed: !currentCompleted } : t
          ),
        })),
      } : prev);

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

        // Refresh summary counts
        fetch(`${API}/api/summary/${user.localAccountId}`)
          .then(r => r.json())
          .then(setSummary)
          .catch(() => {});
      } catch {
        // Roll back
        setDashboard(prev => prev ? {
          ...prev,
          milestones: prev.milestones.map(m => ({
            ...m,
            tasks: m.tasks.map(t =>
              t.taskId === taskId ? { ...t, completed: currentCompleted } : t
            ),
          })),
        } : prev);
      }
    },
    [user, dashboard]
  );

  const totalCompleted = summary.reduce((s, g) => s + g.completedTasks, 0);
  const totalTasks     = summary.reduce((s, g) => s + g.totalTasks, 0);
  const overallPercent = totalTasks ? Math.round((totalCompleted / totalTasks) * 100) : 0;

  const currentGradeLabel = dashboard ? GRADE_LABELS[dashboard.grade] : null;

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-icon">📊</div>
          <div>
            <h1>My Dashboard</h1>
            <p>
              {user?.name ? `Welcome back, ${user.name}` : 'Your progress at a glance'}
            </p>
          </div>
        </div>
      </header>

      <div className="container">
        {loading && <p className="loading-msg">Loading dashboard...</p>}
        {error   && <p className="error-msg">Could not load dashboard. Please try again.</p>}

        {!loading && !error && (
          <>
            {/* Overall progress */}
            <section className="dashboard-overall-section">
              <div className="dashboard-overall-card">
                <div className="dashboard-overall-stats">
                  <div className="dashboard-stat">
                    <span className="dashboard-stat-value">{totalCompleted}</span>
                    <span className="dashboard-stat-label">Tasks Completed</span>
                  </div>
                  <div className="dashboard-stat">
                    <span className="dashboard-stat-value">{totalTasks - totalCompleted}</span>
                    <span className="dashboard-stat-label">Tasks Remaining</span>
                  </div>
                  <div className="dashboard-stat">
                    <span className="dashboard-stat-value">{overallPercent}%</span>
                    <span className="dashboard-stat-label">Overall Progress</span>
                  </div>
                </div>
                <div className="overall-progress-section" style={{ marginTop: '1rem' }}>
                  <div className="overall-progress-bar">
                    <div className="overall-progress-fill" style={{ width: `${overallPercent}%` }} />
                  </div>
                  <p className="overall-progress-label">
                    {totalCompleted} / {totalTasks} total tasks complete
                  </p>
                </div>
              </div>
            </section>

            {/* Per-grade summary */}
            <section className="dashboard-grades-section">
              <h2>Grade Progress</h2>
              <div className="dashboard-grade-grid">
                {summary.map(g => {
                  const info = GRADE_LABELS[g.grade];
                  return (
                    <Link key={g.grade} to={info?.link ?? '/'} className="dashboard-grade-card">
                      <div className="dashboard-grade-header">
                        <span className="dashboard-grade-title">{info?.title ?? `Grade ${g.grade}`}</span>
                        <span className="dashboard-grade-badge">{g.percent}%</span>
                      </div>
                      <div className="milestone-progress-bar" style={{ marginTop: '0.5rem' }}>
                        <div className="milestone-progress-fill" style={{ width: `${g.percent}%` }} />
                      </div>
                      <p className="dashboard-grade-counts">{g.completedTasks} / {g.totalTasks} tasks</p>
                    </Link>
                  );
                })}
              </div>
            </section>

            {/* Current grade milestones */}
            {dashboard && (
              <section className="milestones-section">
                <h2>
                  Current Grade Milestones
                  {currentGradeLabel && (
                    <Link to={currentGradeLabel.link} className="dashboard-grade-link">
                      {currentGradeLabel.title} →
                    </Link>
                  )}
                </h2>
                {dashboard.milestones.length === 0 && (
                  <p className="loading-msg">No milestones found for your grade.</p>
                )}
                {dashboard.milestones.map(m => (
                  <MilestoneSection key={m._id} milestone={m} onToggle={toggleTask} />
                ))}
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
