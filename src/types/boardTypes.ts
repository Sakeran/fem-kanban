export type Subtask = { title: string; isCompleted: boolean };

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

export type BoardColumn = {
  id: string;
  name: string;
  boardColor: string;
  tasks: Task[];
};

export type Board = {
  id: string;
  name: string;
  columns: BoardColumn[];
};
