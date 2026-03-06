import React from 'react';
import { Link } from 'react-router-dom';
import { useMilestones } from '../hooks/useMilestones';
import MilestoneSection from '../components/MilestoneSection';

const Grade12Page: React.FC = () => {
  const { milestones, loading, error, toggleTask } = useMilestones(12);

  const totalTasks     = milestones.reduce((s, m) => s + m.tasks.length, 0);
  const completedTasks = milestones.reduce((s, m) => s + m.tasks.filter(t => t.completed).length, 0);
  const percent        = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grade-detail-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1>12th Grade: Application & Decision</h1>
            <p>The final stretch - applications, aid, and decisions</p>
          </div>
        </div>
        <div className="back-button">
          <Link to="/">← Back to Overview</Link>
        </div>
      </header>

      <div className="page-content">
        {/* Senior Year Focus */}
        <section className="senior-focus-section">
          <div className="senior-focus">
            <div className="focus-icon">🎓</div>
            <div className="focus-content">
              <h3>Senior Year Focus</h3>
              <p>This is all focus on submitting strong applications, applying for financial aid, and making your final college choice. Stay organized and don't procrastinate.</p>
            </div>
          </div>
        </section>

        {/* Overall Progress */}
        {!loading && !error && totalTasks > 0 && (
          <section className="overall-progress-section">
            <div className="overall-progress-bar">
              <div className="overall-progress-fill" style={{ width: `${percent}%` }} />
            </div>
            <p className="overall-progress-label">
              Overall: {completedTasks} / {totalTasks} tasks complete ({percent}%)
            </p>
          </section>
        )}

        {/* Milestones */}
        <section className="milestones-section">
          <h2>📋 Milestones & Tasks</h2>
          {loading && <p className="loading-msg">Loading milestones...</p>}
          {error   && <p className="error-msg">Could not load milestones. Please try again.</p>}
          {milestones.map(m => (
            <MilestoneSection key={m._id} milestone={m} onToggle={toggleTask} />
          ))}
        </section>

        {/* Senior Year Success Tips */}
        <section className="success-tips-section">
          <h2>✅ Senior Year Success Tips</h2>
          <div className="tips-grid">
            <div className="tips-column">
              <h3>Application Strategy</h3>
              <ul>
                <li>Apply to 8-12 schools (reach, match, safety)</li>
                <li>Start essays early - they take time to perfect</li>
                <li>Ask for recommendation letters by October</li>
                <li>Submit applications well before deadlines</li>
              </ul>
            </div>
            <div className="tips-column">
              <h3>Financial Planning</h3>
              <ul>
                <li>Complete FAFSA as soon as possible after Oct 1</li>
                <li>Apply for scholarships throughout the year</li>
                <li>Compare financial aid offers carefully</li>
                <li>Consider all costs, not just tuition</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Grade12Page;
