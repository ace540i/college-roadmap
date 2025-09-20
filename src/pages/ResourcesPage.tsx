import React from 'react';
import { Link } from 'react-router-dom';

const ResourcesPage: React.FC = () => {
  return (
    <div className="resources-page">
      {/* Header */}
      <header className="header">
        <div className="header-content">
          <div className="header-icon">👥</div>
          <div>
            <h1>College Prep Resources</h1>
            <p>Essential tools, websites, and information for your college journey</p>
          </div>
        </div>
      </header>

      <div className="resources-container">
        <div className="back-button">
          <Link to="/">← Back to Overview</Link>
        </div>

        {/* Resource Hub Section */}
        <section className="resource-hub-section">
          <div className="resource-hub-header">
            <div className="hub-icon">🌐</div>
            <h2>Resource Hub</h2>
          </div>
          <p className="hub-description">
            Access carefully curated resources to help with college research, applications, financial aid, and career planning. Most resources are free and officially recommended.
          </p>
        </section>

        {/* College Search & Research */}
        <section className="resource-category">
          <div className="category-header">
            <div className="category-icon search-icon">🔍</div>
            <h2>College Search & Research</h2>
          </div>
          
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-header">
                <h3>College Board BigFuture</h3>
                <span className="resource-type">Website</span>
              </div>
              <p>Official college search tool with detailed information about schools</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="resource-header">
                <h3>Common Application</h3>
                <span className="resource-type">Application Platform</span>
              </div>
              <p>Apply to multiple colleges with one application</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="resource-header">
                <h3>Naviance</h3>
                <span className="resource-type">School Platform</span>
              </div>
              <p>College and career planning platform; check if your school has access</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>
          </div>
        </section>

        {/* Financial Aid & Scholarships */}
        <section className="resource-category">
          <div className="category-header">
            <div className="category-icon financial-icon">💰</div>
            <h2>Financial Aid & Scholarships</h2>
          </div>
          
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-header">
                <h3>FAFSA</h3>
                <span className="resource-type">Government Form</span>
              </div>
              <p>Free Application for Federal Student Aid - must complete for financial aid</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="resource-header">
                <h3>Scholarships.com</h3>
                <span className="resource-type">Scholarship Database</span>
              </div>
              <p>Comprehensive scholarship search database</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="resource-header">
                <h3>Net Price Calculators</h3>
                <span className="resource-type">Calculator</span>
              </div>
              <p>Estimate college costs and potential aid at individual college websites</p>
              <button className="visit-resource-btn">
                Check Individual Schools <span className="external-link">↗</span>
              </button>
            </div>
          </div>
        </section>

        {/* Test Preparation */}
        <section className="resource-category">
          <div className="category-header">
            <div className="category-icon test-icon">📝</div>
            <h2>Test Preparation</h2>
          </div>
          
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-header">
                <h3>Khan Academy SAT Prep</h3>
                <span className="resource-type">Free Prep</span>
              </div>
              <p>Free, personalized SAT practice in partnership with College Board</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="resource-header">
                <h3>ACT Student</h3>
                <span className="resource-type">Official Prep</span>
              </div>
              <p>Official ACT test prep resources and registration</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="resource-header">
                <h3>College Board SAT Suite</h3>
                <span className="resource-type">Official Prep</span>
              </div>
              <p>Official SAT practice tests and resources</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>
          </div>
        </section>

        {/* Career Exploration */}
        <section className="resource-category">
          <div className="category-header">
            <div className="category-icon career-icon">🎯</div>
            <h2>Career Exploration</h2>
          </div>
          
          <div className="resources-grid">
            <div className="resource-card">
              <div className="resource-header">
                <h3>O*NET Interest Profiler</h3>
                <span className="resource-type">Career Assessment</span>
              </div>
              <p>Discover careers that match your interests and skills</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="resource-header">
                <h3>Bureau of Labor Statistics</h3>
                <span className="resource-type">Government Resource</span>
              </div>
              <p>Comprehensive career information including job outlook and salaries</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>

            <div className="resource-card">
              <div className="resource-header">
                <h3>LinkedIn Learning</h3>
                <span className="resource-type">Learning Platform</span>
              </div>
              <p>Professional skill development and career insights</p>
              <button className="visit-resource-btn">
                Visit Resource <span className="external-link">↗</span>
              </button>
            </div>
          </div>
        </section>

        {/* Tips Section */}
        <section className="resources-tips">
          <h3>💡 Resource Tips</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>Free Resources First</h4>
              <p>Always explore free official resources before considering paid alternatives. Many high-quality tools are available at no cost.</p>
            </div>
            <div className="tip-card">
              <h4>School Resources</h4>
              <p>Check with your school counselor about what resources your school provides - many have premium subscriptions you can access.</p>
            </div>
            <div className="tip-card">
              <h4>Stay Organized</h4>
              <p>Bookmark useful resources and create accounts where needed. Organization will save time during the application process.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ResourcesPage;