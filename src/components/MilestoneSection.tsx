import React from 'react';
import { IMilestone } from '../types/api';

interface Props {
  milestone: IMilestone;
  onToggle:  (taskId: string, currentCompleted: boolean) => void;
}

const MilestoneSection: React.FC<Props> = ({ milestone, onToggle }) => {
  const total     = milestone.tasks.length;
  const completed = milestone.tasks.filter(t => t.completed).length;
  const percent   = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="milestone-section">
      <div className="milestone-section-header">
        <h3>{milestone.title}</h3>
        {milestone.description && <p className="milestone-description">{milestone.description}</p>}
        <div className="milestone-progress">
          <div className="milestone-progress-bar">
            <div className="milestone-progress-fill" style={{ width: `${percent}%` }} />
          </div>
          <span className="milestone-progress-label">{completed} / {total} tasks complete</span>
        </div>
      </div>

      <div className="milestone-tasks">
        {milestone.tasks.map(task => (
          <label key={task.taskId} className={`task-row ${task.completed ? 'task-completed' : ''}`}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => onToggle(task.taskId, task.completed)}
              className="task-checkbox"
            />
            <div className="task-content">
              <span className="task-title">{task.title}</span>
              {task.description && (
                <span className="task-desc">{task.description}</span>
              )}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default MilestoneSection;
