import { currentlyViewedTask } from "../../../stores/appState";
import { eventBus } from "../../../lib/eventBus";
import type { StateMachineState } from "../types";
import { stateMachine } from "../stateMachine";

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
  },

  onExit() {
    delete this.currentTask;
    currentlyViewedTask.set(undefined);

    this.closeUnsub();
    this.editUnsub();
    this.deleteUnsub();
  },
};
