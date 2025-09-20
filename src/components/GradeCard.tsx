import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  grade: string;
  title: string;
  description: string;
  score: number;
  tasks: string[];
  link: string;
}

const GradeCard: React.FC<Props> = ({ grade, title, description, score, tasks, link }) => {
  return (
    <div className="grade-card">
      <div className="grade-header">
        <span className="grade-badge">{grade}</span>
        <span className="grade-number">{score}</span>
      </div>
      <h3 className="grade-title">{title}</h3>
      <p className="grade-description">{description}</p>
      
      <div className="grade-tasks">
        {tasks.map((task, index) => (
          <div key={index} className="task-item">
            <span className="task-bullet">✓</span>
            <span className="task-text">{task}</span>
          </div>
        ))}
      </div>
      
      <Link to={link} className="view-details-btn">
        View {grade} Details →
      </Link>
    </div>
  );
};

export default GradeCard;
