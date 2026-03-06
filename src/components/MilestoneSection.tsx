import React from 'react';
import { IMilestone } from '../types/api';

interface Props {
  milestone: IMilestone;
  onToggle:  (taskId: string, currentCompleted: boolean) => void;
}

const ICONS         = ['🎯', '📚', '🌟'];
const COLOR_CLASSES = ['ms-color-1', 'ms-color-2', 'ms-color-3'];
const BADGE_CLASSES = ['ms-badge-1', 'ms-badge-2', 'ms-badge-3'];

const MilestoneSection: React.FC<Props> = ({ milestone, onToggle }) => {
  const idx      = ((milestone.order ?? 1) - 1) % 3;
  const colorCls = COLOR_CLASSES[idx];
  const badgeCls = BADGE_CLASSES[idx];

  const total     = milestone.tasks.length;
  const completed = milestone.tasks.filter(t => t.completed).length;
  const percent   = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className={`milestone-section ${colorCls}`}>

      {/* Header: icon | title + description | badge */}
      <div className="milestone-section-header">
        <div className="milestone-icon" aria-hidden="true">{ICONS[idx]}</div>
        <div className="milestone-header-text">
          <h3>{milestone.title}</h3>
          {milestone.description && (
            <p className="milestone-description">{milestone.description}</p>
          )}
        </div>
        <span className={`milestone-badge ${badgeCls}`}>{completed}/{total} done</span>
      </div>

      {/* Progress bar */}
      <div className="milestone-progress-wrap">
        <div className="milestone-progress-bar">
          <div className="milestone-progress-fill" style={{ width: `${percent}%` }} />
        </div>
      </div>

      {/* Task list */}
      <div className="milestone-tasks">
        {milestone.tasks.map((task, i) => (
          <label
            key={task.taskId ?? `task-${i}`}
            className={`task-row${task.completed ? ' task-completed' : ''}`}
          >
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
