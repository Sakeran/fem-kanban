import filterUniqueStrings from "../../helpers/filterUniqueStrings";
import generateId from "../../helpers/generateId";
import type { BoardColumn } from "./boardColumn";

export type Subtask = { title: string; isCompleted: boolean };

export type TaskData = {
  id: string;
  title: string;
  description: string;
  subtasks: Subtask[];
};

export class Task {
  public id: string;
  public title: string;
  public description: string;
  public subtasks: Subtask[];

  private _column: BoardColumn | undefined;

  get status() {
    if (!this._column)
      throw new Error("Tried to get the status of a task with no column.");

    return this._column.name;
  }

  get column() {
    if (!this._column) throw new Error("Task has no column set.");

    return this._column;
  }

  get board() {
    const column = this.column;
    return column.board;
  }

  static createNewTask(title: string, description: string, subtasks: string[]) {
    const task = new Task();

    task.id = generateId();
    task.title = title;
    task.description = description;
    task.subtasks = createSubtasksFromStrings(subtasks);

    return task;
  }

  static loadFromData(data: TaskData) {
    const task = new Task();

    task.id = data.id;
    task.title = data.title;
    task.description = data.description;
    task.subtasks = data.subtasks.map((s) => Object.assign({}, s));

    return task;
  }

  dispatchChangeEvent() {
    if (this.column) {
      this.column.dispatchChangeEvent();
    }
  }

  serializeToData(): TaskData {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      subtasks: this.subtasks.map((s) => Object.assign({}, s)),
    };
  }

  setColumn(column: BoardColumn) {
    this._column = column;
  }

  unsetColumn() {
    this._column = undefined;
  }

  update(data: {
    title?: string;
    description?: string;
    subtasks?: string[];
    status?: string;
  }) {
    if (data.title) {
      this.title = data.title;
    }

    if (data.description) {
      this.description = data.description;
    }

    if (data.subtasks) {
      this.updateSubtasks(data.subtasks);
    }

    if (data.status) {
      this.updateColumn(data.status);
    }

    this.dispatchChangeEvent();
  }

  updateSubtasks(subtaskTitles: string[]) {
    this.subtasks = filterUniqueStrings(subtaskTitles).map((title) => {
      const existing = this.subtasks.find((st) => st.title === title);

      return {
        title,
        isCompleted: existing ? existing.isCompleted : false,
      };
    });
  }

  toggleSubtask(subtaskTitle) {
    const subtask = this.subtasks.find((s) => s.title === subtaskTitle);

    if (!subtask) {
      console.warn(
        `Tried to toggle task ${this.title}'s with non-existent subtask ${subtaskTitle}.`
      );
      return;
    }

    subtask.isCompleted = !subtask.isCompleted;
    this.dispatchChangeEvent();
  }

  updateColumn(columnName: string) {
    this.board.updateTaskColumn(this, columnName);
  }

  delete() {
    if (!this.column) return;

    // Removing the task from the column is sufficient to remove it from the
    // data structure.
    this.column.removeTask(this);
  }
}

function createSubtasksFromStrings(subtasks: string[]): Subtask[] {
  return filterUniqueStrings(subtasks).map((s) => ({ title: s, isCompleted: false }));
}
