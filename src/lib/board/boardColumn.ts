import type Board from "./board";
import type { TaskData } from "./task";
import Task from "./task";

export type BoardColumnData = {
  id: string;
  name: string;
  boardColor: string;
  tasks: TaskData[];
};

export default class BoardColumn {
  readonly id;
  readonly name;
  readonly boardColor;

  public tasks;

  constructor(columnData, readonly board: Board) {
    this.id = columnData.id;
    this.name = columnData.name;
    this.boardColor = columnData.boardColor;

    this.tasks = columnData.tasks.map((td) => new Task(td, this, board));
  }

  addTask(task: Task) {
    task.status = this.name;
    this.tasks.push(task);
  }

  removeTask(task: Task) {
    this.tasks = this.tasks.filter((t) => t !== task);
  }

  serializeToData() {
    return {
      id: this.id,
      name: this.name,
      boardColor: this.boardColor,
      tasks: this.tasks.map((t) => t.serializeToData()),
    };
  }
}
