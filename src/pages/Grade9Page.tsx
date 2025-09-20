import React from 'react';
import { Link } from 'react-router-dom';

const Grade9Page: React.FC = () => {
  return (
    <div className="grade-detail-page">
      <div className="page-header">
        <div className="back-button">
          <Link to="/">← Back to Overview</Link>
        </div>
        <div className="grade-header-content">
          <div className="grade-number-large">9</div>
          <div>
            <h1>9th Grade: Foundation Building</h1>
            <p>Start strong with good habits and explore your interests</p>
          </div>
        </div>
      </div>

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

        {/* Seasonal Timeline */}
        <section className="timeline-section">
          <h2>📅 Yearly Timeline</h2>
          
          <div className="season-block">
            <h3>Fall</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag college-prep">college prep</span>
                <span className="tag fall">fall</span>
              </div>
              <h4>Meet with School Counselor</h4>
              <p>Introduce yourself to your guidance counselor and discuss your academic goals</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag academics">academics</span>
                <span className="tag fall">fall</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Take Challenging Core Classes</h4>
              <p>Enroll in Honors or advanced classes in English, Mathematics, Science, and Social Studies to build a strong foundation</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag extracurricular">join extracurricular</span>
                <span className="tag fall">fall</span>
              </div>
              <h4>Join Clubs and Activities</h4>
              <p>Explore extracurricular activities that interest you. Try different clubs to find your passion</p>
              <div className="milestone-status">○</div>
            </div>
          </div>

          <div className="season-block">
            <h3>Winter</h3>
            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag academics">academics</span>
                <span className="tag winter">winter</span>
                <span className="tag high-priority">⚠ High Priority</span>
              </div>
              <h4>Develop Study Habits</h4>
              <p>Establish consistent study routines and time management skills</p>
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
              <h4>Plan Summer Activities</h4>
              <p>Look for summer programs, jobs, or volunteer opportunities that align with your interests</p>
              <div className="milestone-status">○</div>
            </div>

            <div className="milestone-card">
              <div className="milestone-tags">
                <span className="tag testing">testing</span>
                <span className="tag spring">spring</span>
              </div>
              <h4>Consider PSAT 8/9</h4>
              <p>Take the PSAT 8/9 for practice and to identify areas for improvement</p>
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
