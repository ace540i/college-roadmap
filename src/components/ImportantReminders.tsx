import React from 'react';

const ImportantReminders: React.FC = () => {
  return (
    <section className="reminders-section">
      <h2>⚠️ Important Reminders</h2>
      <div className="reminders-grid">
        <div className="reminder-card financial-aid">
          <div className="reminder-icon">💰</div>
          <div className="reminder-content">
            <h3>Financial Aid</h3>
            <p>FAFSA opens October 1st each year. Apply early for better aid opportunities.</p>
          </div>
        </div>
        <div className="reminder-card application-deadlines">
          <div className="reminder-icon">📋</div>
          <div className="reminder-content">
            <h3>Application Deadlines</h3>
            <p>Most college applications are due between November and February of senior year.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImportantReminders;
