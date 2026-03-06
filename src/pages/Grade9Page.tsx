import React from 'react';
import { Link } from 'react-router-dom';
import { useMilestones } from '../hooks/useMilestones';
import MilestoneSection from '../components/MilestoneSection';

const Grade9Page: React.FC = () => {
  const { milestones, loading, error, toggleTask } = useMilestones(9);

  const totalTasks     = milestones.reduce((s, m) => s + m.tasks.length, 0);
  const completedTasks = milestones.reduce((s, m) => s + m.tasks.filter(t => t.completed).length, 0);
  const percent        = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grade-detail-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1>9th Grade: Foundation Building</h1>
            <p>Start strong with good habits and explore your interests</p>
          </div>
        </div>
        <div className="back-button">
          <Link to="/">← Back to Overview</Link>
        </div>
      </header>

      <div className="page-content">
        {/* Goals Section */}
        <section className="goals-section">
          <h2>🎯 9th Grade Goals</h2>
          <div className="goals-grid">
            <div className="goal-item">
              <div className="goal-icon">📚</div>
              <span>Build strong academic foundation</span>
            </div>
            <div className="goal-item">
              <div className="goal-icon">👥</div>
              <span>Explore extracurricular activities</span>
            </div>
            <div className="goal-item">
              <div className="goal-icon">⏰</div>
              <span>Develop time management skills</span>
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

        {/* Pro Tips Section */}
        <section className="pro-tips-section">
          <h2>💡 Pro Tips for 9th Grade Success</h2>
          <div className="tips-grid">
            <div className="tips-column">
              <h3>Academic Success</h3>
              <ul>
                <li>Take challenging courses that interest you</li>
                <li>Ask for help when you need it</li>
                <li>Start building relationships with teachers</li>
              </ul>
            </div>
            <div className="tips-column">
              <h3>Extracurriculars</h3>
              <ul>
                <li>Try different activities to find your passion</li>
                <li>Quality over quantity - go deep in a few areas</li>
                <li>Look for leadership opportunities</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Grade9Page;
