import { currentlyViewedTask } from "../../../stores/appState";
import { eventBus } from "../../../lib/eventBus";
import type { StateMachineState } from "../types";
import { stateMachine } from "../stateMachine";
import { updateCurrentBoard } from "../../../stores/boardData";

export const ViewTaskState: StateMachineState = {
  name: "viewTask",

  onEnter(task) {
    this.currentTask = task;
    currentlyViewedTask.set(task);

    this.closeUnsub = eventBus.subscribe("viewTaskClose", () => {
      stateMachine.transition("viewCurrentBoard");
    });

    this.editUnsub = eventBus.subscribe("editTask", () => {
      stateMachine.transition("editTask", this.currentTask);
    });

    this.deleteUnsub = eventBus.subscribe("deleteTask", () => {
      stateMachine.transition("deleteTask", this.currentTask);
    });

    this.toggleUnsub = eventBus.subscribe(
      "viewTaskToggleSubtask",
      (subtaskTitle) => {
        this.currentTask.toggleSubtask(subtaskTitle);

        // Because we can see the current board while viewing the modal, force
        // the board view to update immediately.
        updateCurrentBoard();
      }
    );

    this.updateStatusUnsut = eventBus.subscribe(
      "viewTaskUpdateStatus",
      (columnName) => {
        this.currentTask.updateColumn(columnName);

        // Because we can see the current board while viewing the modal, force
        // the board view to update immediately.
        updateCurrentBoard();
      }
    );
  },

  onExit() {
    delete this.currentTask;
    currentlyViewedTask.set(undefined);

    this.closeUnsub();
    this.editUnsub();
    this.deleteUnsub();
    this.toggleUnsub();
  },
};
