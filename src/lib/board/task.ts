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

  update({ title, description, subtasks, status }) {
    let updatedTask = false;

    if (title) {
      this.updateTitle(title);
      updatedTask = true;
    }

    if (description) {
      this.updateDescription(description);
      updatedTask = true;
    }

    if (status) {
      this.updateStatus(status);
      updatedTask = true;
    }

    if (subtasks) {
      const newSubtasks = subtasks.map((st) => {
        const existing = this.subtasks.find(
          (existing) => existing.title === st
        );

        if (existing) return existing;

        return { title: st, isCompleted: false };
      });

      // Subtasks are updated if there are more or fewer of them, or if the subtasks
      // have been reordered.
      if (newSubtasks.length !== this.subtasks.length) {
        this.data.subtasks = newSubtasks;
        updatedTask = true;
      } else {
        for (let i = 0; i < newSubtasks.length; i++) {
          if (newSubtasks[i].title !== this.subtasks[i].title) {
            this.data.subtasks = newSubtasks;
            updatedTask = true;
            break;
          }
        }
      }
    }

    if (updatedTask) {
      eventBus.dispatch("taskUpdated", this);
    }
  }

  updateTitle(newTitle: string) {
    if (newTitle && newTitle !== this.title) {
      this.data.title = newTitle;
    }
  }

  updateDescription(newDescription: string) {
    if (newDescription && newDescription !== this.description) {
      this.data.description = newDescription;
    }
  }

  updateStatus(newStatus: string) {
    // Check that status is valid.
    if (!this.checkValidStatus(newStatus)) {
      console.warn(
        `Tried to update task's status to ${newStatus}, but that column doesn't exist.`
      );
    }

    this.data.status = newStatus;
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

  checkValidStatus(status) {
    // Check that status is valid.
    return this.board.columnNames.includes(status);
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
