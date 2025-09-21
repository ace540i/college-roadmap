import React from 'react';
import GradeCard from '../components/GradeCard';
import QuickActions from '../components/QuickActions';
import ImportantReminders from '../components/ImportantReminders';

const HomePage: React.FC = () => {
  return (
    <>
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-icon">📚</div>
          <div>
            <h1>HiScholar College Roadmap Overview</h1>
            <p>Your complete guide to college preparation</p>
          </div>
        </div>
      </header>

      <div className="container">
        {/* Welcome Section */}
        <section className="welcome-section">
          <div className="welcome-card">
            <div className="welcome-icon">🎯</div>
            <div className="welcome-content">
              <h3>Welcome to Your College Journey!</h3>
              <p>This roadmap will guide you through each year of high school, helping you build a strong foundation for college applications. Each grade has specific goals and milestones to keep you on track.</p>
            </div>
          </div>
        </section>

        {/* Grade-by-Grade Roadmap */}
        <section className="roadmap-section">
          <h2>📈 Grade-by-Grade Roadmap</h2>
          <div className="grade-grid">
            <GradeCard
              grade="9th Grade"
              title="Foundation Building"
              description="Focus on strong academics, explore interests, and start building good study habits."
              score={9}
              tasks={[
                "Take challenging courses",
                "Join clubs and activities", 
                "Build study skills"
              ]}
              link="/grade-9"
            />
            <GradeCard
              grade="10th Grade"
              title="Exploration & Growth"
              description="Continue building your academic record and explore potential career interests."
              score={10}
              tasks={[
                "Consider AP courses",
                "Develop leadership skills",
                "Research career paths"
              ]}
              link="/grade-10"
            />
            <GradeCard
              grade="11th Grade"
              title="Preparation Intensive"
              description="The most important year for college prep. Take standardized tests and research colleges."
              score={11}
              tasks={[
                "Take SAT/ACT",
                "Visit colleges",
                "Build college list"
              ]}
              link="/grade-11"
            />
            <GradeCard
              grade="12th Grade"
              title="Application & Decision"
              description="Submit applications, apply for financial aid, and make your final college choice."
              score={12}
              tasks={[
                "Submit applications",
                "Complete FAFSA",
                "Make final decision"
              ]}
              link="/grade-12"
            />
          </div>
        </section>

        {/* Quick Actions */}
        <QuickActions />

        {/* Important Reminders */}
        <ImportantReminders />
      </div>
    </>
  );
};

export default HomePage;
