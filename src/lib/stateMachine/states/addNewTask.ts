import { eventBus } from "../../../lib/eventBus";
import type { StateMachineState } from "../types";
import { stateMachine } from "../stateMachine";
import { currentBoard } from "../../../stores/boardData";
import { get } from "svelte/store";
import { Task } from "../../../lib/board/task";

export const AddNewTaskState: StateMachineState = {
  name: "addNewTask",

  onEnter() {
    this.cancelUnsub = eventBus.subscribe("addNewTaskCancel", () => {
      stateMachine.transition("viewCurrentBoard");
    });

    this.createUnsub = eventBus.subscribe("addNewTaskCreate", (taskData) => {
      const task = Task.createNewTask(
        taskData.title,
        taskData.description,
        taskData.subtasks
      );

      get(currentBoard).setTaskColumn(task, taskData.status);

      stateMachine.transition("viewCurrentBoard");
    });
  },

  onExit() {
    this.cancelUnsub();
    this.createUnsub();
  },
};
