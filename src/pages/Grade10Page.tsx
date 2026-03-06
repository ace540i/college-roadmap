import React from 'react';
import { Link } from 'react-router-dom';
import { useMilestones } from '../hooks/useMilestones';
import MilestoneSection from '../components/MilestoneSection';

const Grade10Page: React.FC = () => {
  const { milestones, loading, error, toggleTask } = useMilestones(10);

  const totalTasks     = milestones.reduce((s, m) => s + m.tasks.length, 0);
  const completedTasks = milestones.reduce((s, m) => s + m.tasks.filter(t => t.completed).length, 0);
  const percent        = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grade-detail-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1>10th Grade: Exploration & Growth</h1>
            <p>Build on your foundation and explore deeper interests</p>
          </div>
        </div>
        <div className="back-button">
          <Link to="/">← Back to Overview</Link>
        </div>
      </header>

      <div className="page-content">
        {/* Focus Areas Section */}
        <section className="focus-areas-section">
          <h2>🎯 10th Grade Focus Areas</h2>
          <div className="focus-grid">
            <div className="focus-item">
              <div className="focus-icon">📈</div>
              <span>Increase academic rigor</span>
            </div>
            <div className="focus-item">
              <div className="focus-icon">👥</div>
              <span>Develop leadership skills</span>
            </div>
            <div className="focus-item">
              <div className="focus-icon">💼</div>
              <span>Explore career interests</span>
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

        {/* Success Strategies Section */}
        <section className="success-strategies-section">
          <h2>🚀 10th Grade Success Strategies</h2>
          <div className="strategies-grid">
            <div className="strategy-column">
              <h3>Academic Growth</h3>
              <ul>
                <li>Consider taking your first AP course</li>
                <li>Meet with your guidance counselor regularly</li>
                <li>Start thinking about college preferences</li>
              </ul>
            </div>
            <div className="strategy-column">
              <h3>Leadership Development</h3>
              <ul>
                <li>Run for student government or club officer positions</li>
                <li>Start or join community service projects</li>
                <li>Take on more responsibility in your activities</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Grade10Page;
