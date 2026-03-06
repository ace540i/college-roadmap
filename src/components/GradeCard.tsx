import React from 'react';
import { Link } from 'react-router-dom';

interface Props {
  grade:           string;
  title:           string;
  description:     string;
  score:           number;
  tasks:           string[];
  link:            string;
  completedTasks?: number;
  totalTasks?:     number;
}

const GradeCard: React.FC<Props> = ({
  grade, title, description, score, tasks, link, completedTasks, totalTasks,
}) => {
  const showProgress = totalTasks !== undefined && completedTasks !== undefined;
  const percent = showProgress && totalTasks! > 0
    ? Math.round((completedTasks! / totalTasks!) * 100)
    : 0;

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

      {showProgress && (
        <div className="grade-card-progress">
          <div className="grade-card-progress-bar">
            <div className="grade-card-progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <span className="grade-card-progress-label">
            {completedTasks} / {totalTasks} tasks &mdash; {percent}%
          </span>
        </div>
      )}

      <Link to={link} className="view-details-btn">
        View {grade} Details →
      </Link>
    </div>
  );
};

export default GradeCard;
