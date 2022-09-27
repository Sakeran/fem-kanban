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
    readonly id: string,
    readonly title: string,
    readonly description: string,
    readonly status: string,
    readonly subtasks: Subtask[]
  ) {}

  static createFromData(data: TaskData) {
    return new Task(data.id, data.title, data.description, data.status, data.subtasks);
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
