import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/grade-9" element={<Grade9Page />} />
          <Route path="/grade-10" element={<Grade10Page />} />
          <Route path="/grade-11" element={<Grade11Page />} />
          <Route path="/grade-12" element={<Grade12Page />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/resources" element={<ResourcesPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
