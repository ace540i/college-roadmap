import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Grade9Page from './pages/Grade9Page';
import Grade10Page from './pages/Grade10Page';
import Grade11Page from './pages/Grade11Page';
import Grade12Page from './pages/Grade12Page';
import TimelinePage from './pages/TimelinePage';
import ResourcesPage from './pages/ResourcesPage';
import './styles.css';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/grade-9" element={<Grade9Page />} />
            <Route path="/grade-10" element={<Grade10Page />} />
            <Route path="/grade-11" element={<Grade11Page />} />
            <Route path="/grade-12" element={<Grade12Page />} />
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/resources" element={<ResourcesPage />} />
            
            {/* Additional routes for new sidebar links */}
            <Route path="/course-selection" element={<div className="page-placeholder"><h2>Course Selection</h2><p>Coming soon!</p></div>} />
            <Route path="/degree-requirements" element={<div className="page-placeholder"><h2>Degree Requirements</h2><p>Coming soon!</p></div>} />
            <Route path="/schedule-planning" element={<div className="page-placeholder"><h2>Schedule Planning</h2><p>Coming soon!</p></div>} />
            <Route path="/college-search" element={<div className="page-placeholder"><h2>College Search Tools</h2><p>Coming soon!</p></div>} />
            <Route path="/application-tracker" element={<div className="page-placeholder"><h2>Application Tracker</h2><p>Coming soon!</p></div>} />
            <Route path="/test-prep" element={<div className="page-placeholder"><h2>Test Prep</h2><p>Coming soon!</p></div>} />
            <Route path="/financial-aid" element={<div className="page-placeholder"><h2>Financial Aid</h2><p>Coming soon!</p></div>} />
          </Routes>
        </Layout>
      </div>
    </Router>
  );
};

export default App;
