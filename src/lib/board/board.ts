import { eventBus } from "../eventBus";
import type { BoardColumnData } from "./boardColumn";
import BoardColumn from "./boardColumn";
import Task from "./task";
import type { Subtask } from "./task";
import type DeleteTaskModal from "src/modals/DeleteTaskModal.svelte";

export type BoardData = {
  id: string;
  name: string;
  columns: BoardColumnData[];
};

export default class Board {
  readonly id;
  readonly name;

  public columns: BoardColumn[];

  constructor(boardData: BoardData) {
    this.id = boardData.id;
    this.name = boardData.name;

    this.columns = boardData.columns.map((cd) => new BoardColumn(cd, this));
  }

  get columnNames() {
    return this.columns.map((c) => c.name);
  }

  addNewTask({ title, description, subtasks, status }) {
    if (!title) {
      console.warn(
        `Tried to add a new task to board "${this.name}" with no title.`
      );
      return;
    }

    const column = this.columns.find((c) => c.name === status);

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
    const newColumn = this.columns.find((c) => c.name === newColumnName);

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

  serializeToData() {
    return {
      id: this.id,
      name: this.name,
      columns: this.columns.map((c) => c.serializeToData),
    };
  }
}
