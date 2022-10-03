import { currentlyEditedTask, currentlyViewedTask } from "../../../stores/appState";
import { eventBus } from "../../../lib/eventBus";
import type { StateMachineState } from "../types";
import { stateMachine } from "../stateMachine";

export const EditTaskState: StateMachineState = {
  name: "editTask",

  onEnter(task) {
    this.currentTask = task;
    currentlyEditedTask.set(task);

    this.cancelUnsub = eventBus.subscribe("editTaskCancel", () => {
      stateMachine.transition("viewCurrentBoard");
    });

    this.updateUnsub = eventBus.subscribe("editTaskUpdate", (taskData) => {
      task.update(taskData);

      stateMachine.transition("viewCurrentBoard");
    });

  },

  onExit() {
    delete this.currentTask;
    currentlyEditedTask.set(undefined);

    this.cancelUnsub();
    this.updateUnsub();
  },
};