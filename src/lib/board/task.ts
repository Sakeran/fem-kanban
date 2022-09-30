import type Board from "./board";
import type BoardColumn from "./boardColumn";

type Subtask = { title: string; isCompleted: boolean };

export type TaskData = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

export default class Task {
  constructor(
    private data: TaskData,
    private parentColumn: BoardColumn,
    private parentBoard: Board
  ) {}

  get id() {
    return this.data.id;
  }

  get title() {
    return this.data.title;
  }

  get description() {
    return this.data.description;
  }

  get status() {
    return this.data.status;
  }

  get subtasks() {
    return this.data.subtasks;
  }

  get board() {
    return this.parentBoard;
  }

  get column() {
    return this.parentColumn;
  }

  serializeToData() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      subtasks: this.subtasks,
    } as TaskData;
  }
}
