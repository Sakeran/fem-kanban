import { eventBus } from "../../../lib/eventBus";
import type { StateMachineState } from "../types";
import { stateMachine } from "../stateMachine";
import { currentBoard } from "../../../stores/boardData";
import { get } from "svelte/store";

export const AddNewTaskState: StateMachineState = {
  name: "addNewTask",

  onEnter() {
    this.cancelUnsub = eventBus.subscribe("addNewTaskCancel", () => {
      stateMachine.transition("viewCurrentBoard");
    });

    this.createUnsub = eventBus.subscribe("addNewTaskCreate", (taskData) => {
      get(currentBoard).createNewTask(taskData);

      stateMachine.transition("viewCurrentBoard");
    });
  },

  onExit() {
    this.cancelUnsub();
    this.createUnsub();
  },
};
