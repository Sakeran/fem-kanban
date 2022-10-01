import { eventBus } from "../eventBus";
import type Board from "./board";
import type BoardColumn from "./boardColumn";

export type Subtask = { title: string; isCompleted: boolean };

export type TaskData = {
  id: string;
  title: string;
  description: string;
  status: string;
  subtasks: Subtask[];
};

export default class Task {
  private data: TaskData;

  constructor(
    data: TaskData,
    private parentColumn: BoardColumn,
    private parentBoard: Board
  ) {
    this.data = { ...data };
  }

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

  set status(newStatus) {
    this.data.status = newStatus;
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

  updateStatus(newStatus: string) {
    // Check that status is valid.
    for (const { name } of this.board.columns) {
      if (name === newStatus) {
        console.warn(
          `Tried to update task's status to ${newStatus}, but that column doesn't exist.`
        );
        return;
      }
    }

    this.data.status = newStatus;
    eventBus.dispatch("taskUpdated", this);
  }

  toggleSubtask(subtaskTitle: string) {
    const subtask = this.subtasks.find((s) => s.title === subtaskTitle);

    if (!subtask) {
      console.warn(
        `Tried to toggle task ${this.title}'s with non-existent subtask ${subtaskTitle}.`
      );
      return;
    }

    subtask.isCompleted = !subtask.isCompleted;
    eventBus.dispatch("taskUpdated", this);
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
