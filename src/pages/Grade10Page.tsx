import React from 'react';
import { Link } from 'react-router-dom';

const Grade10Page: React.FC = () => {
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

        {/* Seasonal Timeline */}
        <section className="timeline-section">
          <h2>📅 Yearly Timeline</h2>
          
          <div className="season-block">
            <h3>Fall</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag academics">academics</span>
                <span className="tag fall">fall</span>
              </div>
              <h4>Consider First AP Course</h4>
              <p>Research AP courses available at your school and consider taking your first one</p>
              <div className="milestone-status">○</div>
            </div>
          </div>

          <div className="season-block">
            <h3>Winter</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag college-prep">college prep</span>
                <span className="tag winter">winter</span>
              </div>
              <h4>Explore Career Interests</h4>
              <p>Research different career paths and consider job shadowing or informational interviews</p>
              <div className="milestone-status">○</div>
            </div>
          </div>

          <div className="season-block">
            <h3>Spring</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag extracurricular">extracurricular</span>
                <span className="tag spring">spring</span>
              </div>
              <h4>Seek Leadership Roles</h4>
              <p>Run for student government or officer positions in clubs you're passionate about</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag testing">testing</span>
                <span className="tag spring">spring</span>
              </div>
              <h4>Take PSAT 10</h4>
              <p>Take the PSAT 10 to prepare for the PSAT/NMSQT and identify areas to improve</p>
              <div className="milestone-status">○</div>
            </div>
          </div>

          <div className="season-block">
            <h3>Summer</h3>
            <div className="summer-message">
              <p>No milestones scheduled for summer</p>
            </div>
          </div>
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
