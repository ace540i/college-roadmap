import React from 'react';
import { Link } from 'react-router-dom';
import { useMilestones } from '../hooks/useMilestones';
import MilestoneSection from '../components/MilestoneSection';

const Grade11Page: React.FC = () => {
  const { milestones, loading, error, toggleTask } = useMilestones(11);

  const totalTasks     = milestones.reduce((s, m) => s + m.tasks.length, 0);
  const completedTasks = milestones.reduce((s, m) => s + m.tasks.filter(t => t.completed).length, 0);
  const percent        = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="grade-detail-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div>
            <h1>11th Grade: Preparation Intensive</h1>
            <p>The most critical year for college preparation</p>
          </div>
        </div>
        <div className="back-button">
          <Link to="/">← Back to Overview</Link>
        </div>
      </header>

      <div className="page-content">
        {/* Critical Year Alert */}
        <section className="critical-alert-section">
          <div className="critical-alert">
            <div className="alert-icon">⚠️</div>
            <div className="alert-content">
              <h3>Critical Year Alert!</h3>
              <p>11th grade is when colleges pay closest attention to your performance. This is your most important year for standardized testing, college research, and building your application profile.</p>
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

        {/* Critical Success Factors */}
        <section className="critical-factors-section">
          <h2>🎯 11th Grade Critical Success Factors</h2>
          <div className="factors-grid">
            <div className="factor-column">
              <h3>Testing Strategy</h3>
              <ul>
                <li>Take SAT/ACT in spring for best results</li>
                <li>Consider test prep courses or tutoring</li>
                <li>Take SAT Subject Tests if required</li>
                <li>Plan retakes if needed in senior year</li>
              </ul>
            </div>
            <div className="factor-column">
              <h3>College Research</h3>
              <ul>
                <li>Build your college list during spring break</li>
                <li>Attend college fairs and information sessions</li>
                <li>Research financial aid and scholarship options</li>
                <li>Build your initial college list (15-20 schools)</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Grade11Page;
