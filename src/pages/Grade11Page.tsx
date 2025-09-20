import React from 'react';
import { Link } from 'react-router-dom';

const Grade11Page: React.FC = () => {
  return (
    <div className="grade-detail-page">
      <div className="page-header">
        <div className="back-button">
          <Link to="/">← Back to Overview</Link>
        </div>
        <div className="grade-header-content">
          <div className="grade-number-large grade-11">11</div>
          <div>
            <h1>11th Grade: Preparation Intensive</h1>
            <p>The most critical year for college preparation</p>
          </div>
        </div>
      </div>

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

        {/* Seasonal Timeline */}
        <section className="timeline-section">
          <h2>📅 Yearly Timeline</h2>
          
          <div className="season-block">
            <h3>Fall</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag college-prep">college prep</span>
                <span className="tag fall">fall</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Research Colleges</h4>
              <p>Start building your initial college list and research admission requirements</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag testing">testing</span>
                <span className="tag fall">fall</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Take PSAT/NMSQT</h4>
              <p>Take the PSAT/NMSQT to qualify for National Merit scholarships and practice for SAT</p>
              <div className="milestone-status">○</div>
            </div>
          </div>

          <div className="season-block">
            <h3>Winter</h3>
            <div className="winter-message">
              <p>No milestones scheduled for winter</p>
            </div>
          </div>

          <div className="season-block">
            <h3>Spring</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag college-prep">college prep</span>
                <span className="tag spring">spring</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Ask for Recommendation Letters</h4>
              <p>Approach teachers who know you well to write recommendation letters</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag college-prep">college prep</span>
                <span className="tag spring">spring</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Visit Colleges</h4>
              <p>Schedule college visits during spring break or summer to get a feel for campus life</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag testing">testing</span>
                <span className="tag spring">spring</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Take SAT/ACT</h4>
              <p>Take your first official SAT or ACT. Spring is ideal timing for retakes if needed</p>
              <div className="milestone-status">○</div>
            </div>
          </div>

          <div className="season-block">
            <h3>Summer</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag college-prep">college prep</span>
                <span className="tag summer">summer</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Start College Essays</h4>
              <p>Begin brainstorming and drafting your college application essays over the summer</p>
              <div className="milestone-status">○</div>
            </div>
          </div>
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
