import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import ProtectedRoute from './auth/ProtectedRoute';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import Grade9Page from './pages/Grade9Page';
import Grade10Page from './pages/Grade10Page';
import Grade11Page from './pages/Grade11Page';
import Grade12Page from './pages/Grade12Page';
import TimelinePage from './pages/TimelinePage';
import ResourcesPage from './pages/ResourcesPage';
import DashboardPage from './pages/DashboardPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import './styles.css';

const ProtectedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ProtectedRoute>
    <Layout>{children}</Layout>
  </ProtectedRoute>
);

const App: React.FC = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app">
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes */}
            <Route path="/" element={<ProtectedLayout><HomePage /></ProtectedLayout>} />
            <Route path="/grade-9" element={<ProtectedLayout><Grade9Page /></ProtectedLayout>} />
            <Route path="/grade-10" element={<ProtectedLayout><Grade10Page /></ProtectedLayout>} />
            <Route path="/grade-11" element={<ProtectedLayout><Grade11Page /></ProtectedLayout>} />
            <Route path="/grade-12" element={<ProtectedLayout><Grade12Page /></ProtectedLayout>} />
            <Route path="/dashboard" element={<ProtectedLayout><DashboardPage /></ProtectedLayout>} />
            <Route path="/profile" element={<ProtectedLayout><ProfilePage /></ProtectedLayout>} />
            <Route path="/timeline" element={<ProtectedLayout><TimelinePage /></ProtectedLayout>} />
            <Route path="/resources" element={<ProtectedLayout><ResourcesPage /></ProtectedLayout>} />
            <Route path="/course-selection" element={<ProtectedLayout><div className="page-placeholder"><h2>Course Selection</h2><p>Coming soon!</p></div></ProtectedLayout>} />
            <Route path="/degree-requirements" element={<ProtectedLayout><div className="page-placeholder"><h2>Degree Requirements</h2><p>Coming soon!</p></div></ProtectedLayout>} />
            <Route path="/schedule-planning" element={<ProtectedLayout><div className="page-placeholder"><h2>Schedule Planning</h2><p>Coming soon!</p></div></ProtectedLayout>} />
            <Route path="/college-search" element={<ProtectedLayout><div className="page-placeholder"><h2>College Search Tools</h2><p>Coming soon!</p></div></ProtectedLayout>} />
            <Route path="/application-tracker" element={<ProtectedLayout><div className="page-placeholder"><h2>Application Tracker</h2><p>Coming soon!</p></div></ProtectedLayout>} />
            <Route path="/test-prep" element={<ProtectedLayout><div className="page-placeholder"><h2>Test Prep</h2><p>Coming soon!</p></div></ProtectedLayout>} />
            <Route path="/financial-aid" element={<ProtectedLayout><div className="page-placeholder"><h2>Financial Aid</h2><p>Coming soon!</p></div></ProtectedLayout>} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
