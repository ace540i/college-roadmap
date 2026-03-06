export interface IStep {
  order: number;
  text:  string;
}

export interface ITask {
  taskId:       string;
  title:        string;
  description?: string;
  order?:       number;
  steps:        IStep[];
  completed:    boolean;
}

export interface IMilestone {
  _id:          string;
  grade:        number;
  title:        string;
  description?: string;
  order:        number;
  tasks:        ITask[];
}

export interface IGradeSummary {
  grade:          number;
  completedTasks: number;
  totalTasks:     number;
  percent:        number;
}
