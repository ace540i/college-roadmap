import React from 'react';
import { Link } from 'react-router-dom';

const Grade12Page: React.FC = () => {
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

        {/* Seasonal Timeline */}
        <section className="timeline-section">
          <h2>📅 Yearly Timeline</h2>
          
          <div className="season-block">
            <h3>Fall</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag financial-aid">financial aid</span>
                <span className="tag fall">fall</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Submit FAFSA</h4>
              <p>Complete the Free Application for Federal Student Aid as soon as possible after October 1</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag college-prep">college prep</span>
                <span className="tag fall">fall</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Complete College Applications</h4>
              <p>Submit early action/decision applications and work on regular decision applications</p>
              <div className="milestone-status">○</div>
            </div>
          </div>

          <div className="season-block">
            <h3>Winter</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag college-prep">college prep</span>
                <span className="tag winter">winter</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Submit Remaining Applications</h4>
              <p>Complete and submit all regular decision college applications before deadlines</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag financial-aid">financial aid</span>
                <span className="tag winter">winter</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Apply for Scholarships</h4>
              <p>Research and apply for merit-based and need-based scholarships</p>
              <div className="milestone-status">○</div>
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
              <h4>Make Final College Decision</h4>
              <p>Choose your college and submit enrollment deposit by May 1st</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag financial-aid">financial aid</span>
                <span className="tag spring">spring</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Compare Financial Aid Offers</h4>
              <p>Review and compare financial aid packages from accepted schools</p>
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
