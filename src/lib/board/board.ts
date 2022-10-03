import { eventBus } from "../eventBus";
import type { BoardColumnData } from "./boardColumn";
import BoardColumn from "./boardColumn";
import Task from "./task";
import type { Subtask } from "./task";
import type { TaskCreateData } from "./task";

export type BoardData = {
  id: string;
  name: string;
  columns: BoardColumnData[];
};

export type BoardDataUpdate = {
  name: string;
  columns: string[];
};

export default class Board {
  readonly id;
  public name;

  public columns: BoardColumn[];

  static createFromUpdate(updateData: BoardDataUpdate) {
    // TODO - Better implementation. Probably requires a complete
    // refactor of the data layer.
    return new Board({
      id: Math.random().toString(36).slice(2),
      name: updateData.name,
      columns: updateData.columns.map((name) => ({
        id: "...'",
        name,
        boardColor: "red",
        tasks: [],
      })),
    });
  }

  constructor(boardData: BoardData) {
    this.id = boardData.id;
    this.name = boardData.name;

    this.columns = boardData.columns.map((cd) => new BoardColumn(cd, this));
  }

  get columnNames() {
    return this.columns.map((c) => c.name);
  }

  update(updateData: BoardDataUpdate) {
    const { name, columns } = updateData;

    if (name) {
      this.updateName(name);
    }

    if (columns) {
      this.updateColumns(columns);
    }
  }

  updateName(newName: string) {
    if (newName !== this.name) {
      this.name = newName;
    }
  }

  updateColumns(columns: string[]) {
    // TODO - Placeholder; this isn't the correct behavior
    // (modified column names are deleted, but should be updated positionally)

    const newColumns = columns.map((columnName) => {
      const existing = this.getColumn(columnName);
      if (existing) return existing;

      return new BoardColumn(
        {
          id: Math.random().toString(36).slice(2),
          name: columnName,
          boardColor: "#f00",
          tasks: [],
        },
        this
      );
    });

    this.columns = newColumns;
  }

  addNewTask({ title, description, subtasks, status }) {
    if (!title) {
      console.warn(
        `Tried to add a new task to board "${this.name}" with no title.`
      );
      return;
    }

    const column = this.getColumn(status);

    if (!column) {
      console.warn(
        `Tried to add a new task "${title}" to board "${this.name}" with unknown column "${status}"`
      );
      return;
    }

    const subtaskData: Subtask[] = subtasks.map((st) => ({
      title: st,
      isCompleted: false,
    }));

    // TODO - temporary id function
    const newTaskId = Math.random().toString(36).slice(2);
    const newTask = new Task(
      { id: newTaskId, title, description, status, subtasks: subtaskData },
      column,
      this
    );

    column.addTask(newTask);
    eventBus.dispatch("boardUpdated", this);
  }

  updateTaskColumn(task: Task, newColumnName: string) {
    const currentColumn = task.column;
    const newColumn = this.getColumn(newColumnName);

    if (!newColumn)
      throw new Error(
        `Column name ${newColumnName} does not exist on board ${this.name}`
      );

    currentColumn.removeTask(task);
    newColumn.addTask(task);
  }

  deleteTask(task: Task) {
    task.column.removeTask(task);
  }

  createNewTask(taskData: TaskCreateData) {
    const column = this.getColumn(taskData.status);
    if (!column)
      throw new Error(
        `Tried to create new task with unknown column "${taskData.status}"`
      );

    const id = Math.random().toString(36).slice(2);

    const subtasks = taskData.subtasks.map((st) => ({
      title: st,
      isCompleted: false,
    }));

    const newTask = new Task({ ...taskData, id, subtasks }, column, this);
    column.addTask(newTask);
  }

  getColumn(columnName: string) {
    return this.columns.find((c) => c.name === columnName);
  }

  serializeToData() {
    return {
      id: this.id,
      name: this.name,
      columns: this.columns.map((c) => c.serializeToData),
    };
  }
}
