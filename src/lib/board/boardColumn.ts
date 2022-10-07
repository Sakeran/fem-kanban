import generateId from "../../helpers/generateId";
import type { Board } from "./board";
import type { TaskData } from "./task";
import { Task } from "./task";

export type BoardColumnData = {
  id: string;
  name: string;
  boardColor: string;
  tasks: TaskData[];
};

export class BoardColumn {
  public id: string;
  public name: string;
  public boardColor: string;
  public tasks: Task[];

  private _board: Board | undefined;

  get board() {
    if (!this._board) throw new Error("Column has no board set");

    return this._board;
  }

  static createNewColumn(name, boardColor) {
    const column = new BoardColumn();

    column.id = generateId();
    column.name = name;
    column.boardColor = boardColor;
    column.tasks = [];

    return column;
  }

  static loadFromData(data: BoardColumnData) {
    const column = new BoardColumn();

    column.id = data.id;
    column.name = data.name;
    column.boardColor = data.boardColor;
    column.tasks = data.tasks.map((td) => {
      const task = Task.loadFromData(td);
      task.setColumn(column);
      return task;
    });

    return column;
  }

  dispatchChangeEvent() {
    if (this.board) {
      this.board.dispatchChangeEvent();
    }
  }

  serializeToData(): BoardColumnData {
    return {
      id: this.id,
      name: this.name,
      boardColor: this.boardColor,
      tasks: this.tasks.map((t) => t.serializeToData()),
    };
  }

  setBoard(board: Board) {
    this._board = board;
  }

  addTask(task: Task) {
    if (this.tasks.includes(task)) {
      console.warn(
        `Task "${task.title}" is already included in column "${this.name}"`
      );
      return;
    }

    task.setColumn(this);
    this.tasks.push(task);

    this.dispatchChangeEvent();
  }

  removeTask(task: Task) {
    if (!this.tasks.includes(task)) {
      console.warn(
        `Task to remove "${task.title}" is not included in column "${this.name}"`
      );
      return;
    }

    task.unsetColumn();
    this.tasks = this.tasks.filter((t) => t !== task);

    this.dispatchChangeEvent();
  }

  updateColor(hex: string) {
    this.boardColor = hex;
    this.dispatchChangeEvent();
  }

  updateTasks(tasks: any[]) {
    // Note - Our drag-and-drop library breaks the prototype chain,
    // so upon update we may need to restore it for some items.
    this.tasks = [];
    for (const task of tasks) {
      if (task instanceof Task) {
        this.tasks.push(task);
        continue;
      }

      const newTask = new Task();

      Object.assign(newTask, task);
      newTask.setColumn(this);
      this.tasks.push(newTask);
    }

    this.dispatchChangeEvent();
  }
}
