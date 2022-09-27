import type { TaskData } from "./task";
import Task from "./task";

export type BoardColumnData = {
  id: string;
  name: string;
  boardColor: string;
  tasks: TaskData[];
};

export default class BoardColumn {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly boardColor: string,
    readonly tasks: Task[]
  ) {}

  static createFromData(data: BoardColumnData) {
    return new BoardColumn(
      data.id,
      data.name,
      data.boardColor,
      data.tasks.map((td) => Task.createFromData(td))
    );
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
