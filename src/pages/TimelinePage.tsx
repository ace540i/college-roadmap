import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const TimelinePage: React.FC = () => {
  const [selectedGrade, setSelectedGrade] = useState('all');

  return (
    <div className="timeline-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-icon">📅</div>
          <div>
            <h1>College Prep Timeline</h1>
            <p>Complete roadmap organized by year and season</p>
          </div>
        </div>
      </header>

      <div className="timeline-container">
        <div className="back-button">
          <Link to="/">← Back to Overview</Link>
        </div>

        {/* Grade Filter Tabs */}
        <div className="grade-filter-tabs">
          <button 
            className={`filter-tab ${selectedGrade === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedGrade('all')}
          >
            All Grades
          </button>
          <button 
            className={`filter-tab grade-9-tab ${selectedGrade === '9' ? 'active' : ''}`}
            onClick={() => setSelectedGrade('9')}
          >
            9th Grade
          </button>
          <button 
            className={`filter-tab grade-10-tab ${selectedGrade === '10' ? 'active' : ''}`}
            onClick={() => setSelectedGrade('10')}
          >
            10th Grade
          </button>
          <button 
            className={`filter-tab grade-11-tab ${selectedGrade === '11' ? 'active' : ''}`}
            onClick={() => setSelectedGrade('11')}
          >
            11th Grade
          </button>
          <button 
            className={`filter-tab grade-12-tab ${selectedGrade === '12' ? 'active' : ''}`}
            onClick={() => setSelectedGrade('12')}
          >
            12th Grade
          </button>
        </div>

        {/* 9th Grade Timeline */}
        {(selectedGrade === 'all' || selectedGrade === '9') && (
          <div className="grade-timeline-section">
            <div className="grade-timeline-header grade-9-header">
              <h2>9th Grade</h2>
            </div>
            
            <div className="seasons-grid">
              {/* Fall */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">🍂</span>
                  <h3>Fall</h3>
                </div>
                
                <div className="timeline-activity">
                  <h4>Meet with School Counselor</h4>
                  <p>Introduce yourself to your guidance counselor and discuss your academic goals</p>
                  <div className="activity-tag college-prep">college prep</div>
                </div>

                <div className="timeline-activity priority-high">
                  <h4>Take Challenging Core Classes</h4>
                  <p>Enroll in Honors or advanced classes in English, Math, Science, and Social Studies to build a strong foundation</p>
                  <div className="activity-tag academics">academics</div>
                  <div className="priority-indicator">⚠</div>
                </div>

                <div className="timeline-activity">
                  <h4>Join Clubs and Activities</h4>
                  <p>Explore extracurricular activities that interest you. Try different clubs to find your passion</p>
                  <div className="activity-tag extracurriculars">extracurriculars</div>
                </div>
              </div>

              {/* Winter */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">❄️</span>
                  <h3>Winter</h3>
                </div>
                
                <div className="timeline-activity priority-high">
                  <h4>Develop Study Habits</h4>
                  <p>Establish consistent study routines and time management skills</p>
                  <div className="activity-tag academics">academics</div>
                  <div className="priority-indicator">⚠</div>
                </div>
              </div>

              {/* Spring */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">🌸</span>
                  <h3>Spring</h3>
                </div>
                
                <div className="timeline-activity">
                  <h4>Plan Summer Activities</h4>
                  <p>Look for summer programs, jobs, or volunteer opportunities that align with your interests</p>
                  <div className="activity-tag extracurriculars">extracurriculars</div>
                </div>

                <div className="timeline-activity">
                  <h4>Consider PSAT 8/9</h4>
                  <p>Take the PSAT 8/9 for practice and to identify areas for improvement</p>
                  <div className="activity-tag testing">testing</div>
                </div>
              </div>

              {/* Summer */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">☀️</span>
                  <h3>Summer</h3>
                </div>
                <div className="no-activities">No activities</div>
              </div>
            </div>
          </div>
        )}

        {/* 10th Grade Timeline */}
        {(selectedGrade === 'all' || selectedGrade === '10') && (
          <div className="grade-timeline-section">
            <div className="grade-timeline-header grade-10-header">
              <h2>10th Grade</h2>
            </div>
            
            <div className="seasons-grid">
              {/* Fall */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">🍂</span>
                  <h3>Fall</h3>
                </div>
                
                <div className="timeline-activity">
                  <h4>Consider First AP Course</h4>
                  <p>Research AP courses available at your school and consider taking your first one</p>
                  <div className="activity-tag academics">academics</div>
                </div>
              </div>

              {/* Winter */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">❄️</span>
                  <h3>Winter</h3>
                </div>
                
                <div className="timeline-activity">
                  <h4>Explore Career Interests</h4>
                  <p>Research different career paths and consider job shadowing or informational interviews</p>
                  <div className="activity-tag college-prep">college prep</div>
                </div>
              </div>

              {/* Spring */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">🌸</span>
                  <h3>Spring</h3>
                </div>
                
                <div className="timeline-activity">
                  <h4>Seek Leadership Roles</h4>
                  <p>Run for student government or officer positions in clubs you're passionate about</p>
                  <div className="activity-tag extracurriculars">extracurriculars</div>
                </div>

                <div className="timeline-activity">
                  <h4>Take PSAT 10</h4>
                  <p>Take the PSAT 10 to prepare for the</p>
                  <div className="activity-tag testing">testing</div>
                </div>
              </div>

              {/* Summer */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">☀️</span>
                  <h3>Summer</h3>
                </div>
                <div className="no-activities">No activities</div>
              </div>
            </div>
          </div>
        )}

        {/* 11th Grade Timeline */}
        {(selectedGrade === 'all' || selectedGrade === '11') && (
          <div className="grade-timeline-section">
            <div className="grade-timeline-header grade-11-header">
              <h2>11th Grade</h2>
            </div>
            
            <div className="seasons-grid">
              {/* Fall */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">🍂</span>
                  <h3>Fall</h3>
                </div>
                
                <div className="timeline-activity priority-high">
                  <h4>Research Colleges</h4>
                  <p>Start building your initial college list and research admission requirements</p>
                  <div className="activity-tag college-prep">college prep</div>
                  <div className="priority-indicator">⚠</div>
                </div>

                <div className="timeline-activity priority-high">
                  <h4>Take PSAT/NMSQT</h4>
                  <p>Take the PSAT/NMSQT to qualify for National Merit scholarships and practice for SAT</p>
                  <div className="activity-tag testing">testing</div>
                  <div className="priority-indicator">⚠</div>
                </div>
              </div>

              {/* Winter */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">❄️</span>
                  <h3>Winter</h3>
                </div>
                <div className="no-activities">No activities</div>
              </div>

              {/* Spring */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">🌸</span>
                  <h3>Spring</h3>
                </div>
                
                <div className="timeline-activity priority-high">
                  <h4>Ask for Recommendation Letters</h4>
                  <p>Approach teachers who know you well to write recommendation letters</p>
                  <div className="activity-tag college-prep">college prep</div>
                  <div className="priority-indicator">⚠</div>
                </div>

                <div className="timeline-activity priority-high">
                  <h4>Visit Colleges</h4>
                  <p>Schedule college visits during spring break or summer to get a feel for campus life</p>
                  <div className="activity-tag college-prep">college prep</div>
                  <div className="priority-indicator">⚠</div>
                </div>

                <div className="timeline-activity priority-high">
                  <h4>Take SAT/ACT</h4>
                  <p>Take your first official SAT or ACT. Spring is ideal timing for retakes if needed</p>
                  <div className="activity-tag testing">testing</div>
                  <div className="priority-indicator">⚠</div>
                </div>
              </div>

              {/* Summer */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">☀️</span>
                  <h3>Summer</h3>
                </div>
                
                <div className="timeline-activity priority-high">
                  <h4>Start College Essays</h4>
                  <p>Begin brainstorming and drafting your college application essays over the summer</p>
                  <div className="activity-tag college-prep">college prep</div>
                  <div className="priority-indicator">⚠</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 12th Grade Timeline */}
        {(selectedGrade === 'all' || selectedGrade === '12') && (
          <div className="grade-timeline-section">
            <div className="grade-timeline-header grade-12-header">
              <h2>12th Grade</h2>
            </div>
            
            <div className="seasons-grid">
              {/* Fall */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">🍂</span>
                  <h3>Fall</h3>
                </div>
                
                <div className="timeline-activity priority-high">
                  <h4>Submit FAFSA</h4>
                  <p>Complete the Free Application for Federal Student Aid as soon as possible after October 1</p>
                  <div className="activity-tag financial-aid">financial aid</div>
                  <div className="priority-indicator">⚠</div>
                </div>

                <div className="timeline-activity priority-high">
                  <h4>Complete College Applications</h4>
                  <p>Submit early action/decision applications and work on regular decision applications</p>
                  <div className="activity-tag college-prep">college prep</div>
                  <div className="priority-indicator">⚠</div>
                </div>
              </div>

              {/* Winter */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">❄️</span>
                  <h3>Winter</h3>
                </div>
                
                <div className="timeline-activity priority-high">
                  <h4>Submit Remaining Applications</h4>
                  <p>Complete and submit all regular decision college applications before deadlines</p>
                  <div className="activity-tag college-prep">college prep</div>
                  <div className="priority-indicator">⚠</div>
                </div>

                <div className="timeline-activity priority-high">
                  <h4>Apply for Scholarships</h4>
                  <p>Research and apply for merit-based and need-based scholarships</p>
                  <div className="activity-tag financial-aid">financial aid</div>
                  <div className="priority-indicator">⚠</div>
                </div>
              </div>

              {/* Spring */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">🌸</span>
                  <h3>Spring</h3>
                </div>
                
                <div className="timeline-activity priority-high">
                  <h4>Make Final College Decision</h4>
                  <p>Choose your college and submit enrollment deposit by May 1st</p>
                  <div className="activity-tag college-prep">college prep</div>
                  <div className="priority-indicator">⚠</div>
                </div>

                <div className="timeline-activity priority-high">
                  <h4>Compare Financial Aid Offers</h4>
                  <p>Review and compare financial aid packages from accepted schools</p>
                  <div className="activity-tag financial-aid">financial aid</div>
                  <div className="priority-indicator">⚠</div>
                </div>
              </div>

              {/* Summer */}
              <div className="season-column">
                <div className="season-header">
                  <span className="season-icon">☀️</span>
                  <h3>Summer</h3>
                </div>
                <div className="no-activities">No activities</div>
              </div>
            </div>
          </div>
        )}

        {/* Timeline Legend */}
        <div className="timeline-legend">
          <h3>Timeline Legend</h3>
          <div className="legend-content">
            <div className="legend-section">
              <h4>Seasons</h4>
              <ul>
                <li><strong>Fall:</strong> September - November</li>
                <li><strong>Winter:</strong> December - February</li>
                <li><strong>Spring:</strong> March - May</li>
                <li><strong>Summer:</strong> June - August</li>
              </ul>
            </div>
            <div className="legend-section">
              <h4>Priority Levels</h4>
              <ul>
                <li><span className="priority-indicator">⚠</span> <strong>High Priority</strong> - Critical milestones</li>
                <li><strong>Medium Priority</strong> - Important but flexible timing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;
