import { taskToDelete } from "../../../stores/appState";
import { eventBus } from "../../../lib/eventBus";
import type { StateMachineState } from "../types";
import { stateMachine } from "../stateMachine";

export const DeleteTaskState: StateMachineState = {
  name: "deleteTask",

  onEnter(task) {
    this.currentTask = task;
    taskToDelete.set(task);

    this.cancelUnsub = eventBus.subscribe("deleteTaskCancel", () => {
      stateMachine.transition("viewCurrentBoard");
    });

    this.confirmUnsub = eventBus.subscribe("deleteTaskConfirm", () => {
      task.delete();
      stateMachine.transition("viewCurrentBoard");
    });
  },

  onExit() {
    delete this.currentTask;
    taskToDelete.set(undefined);

    this.cancelUnsub();
    this.confirmUnsub();
  },
};
