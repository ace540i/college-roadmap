import React from 'react';
import { Link } from 'react-router-dom';

const QuickActions: React.FC = () => {
    return (
        <section className="quick-actions-section">
            <h2>⚡ Quick Actions</h2>
            <div className="quick-actions-grid">
                <Link to="/timeline" className="action-card action-link">
                    <div className="action-icon">📅</div>
                    <div className="action-content">
                        <h3>View Timeline</h3>
                        <p>See all important dates and deadlines</p>
                        <span className="action-arrow">→</span>
                    </div>
                </Link>
                <Link to="/resources" className="action-card action-link">
                    <div className="action-icon">👥</div>
                    <div className="action-content">
                        <h3>Browse Resources</h3>
                        <p>Access helpful tools and guides</p>
                        <span className="action-arrow">→</span>
                    </div>
                </Link>
            </div>
        </section>
    );
};

export default QuickActions;
