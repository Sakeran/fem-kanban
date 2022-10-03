import { updateCurrentBoard } from "../../../stores/boardData";
import { eventBus } from "../../../lib/eventBus";
import { stateMachine } from "../stateMachine";
import type { StateMachineState } from "../types";

export const ViewCurrentBoardState: StateMachineState = {
  name: "viewCurrentBoard",

  onEnter() {
    updateCurrentBoard();

    this.onViewTaskUnsub = eventBus.subscribe("viewTask", (task) => {
      stateMachine.transition("viewTask", task);
    });

    this.addTaskUnsub = eventBus.subscribe("addNewTask", () => {
      stateMachine.transition("addNewTask");
    });

    this.editBoardUnsub = eventBus.subscribe("editBoard", (board) => {
      stateMachine.transition("editBoard", board);
    });
  },

  onExit() {
    this.onViewTaskUnsub();
    this.addTaskUnsub();
    this.editBoardUnsub();
  },
};
