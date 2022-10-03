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

    this.deleteBoardUnsub = eventBus.subscribe("deleteBoard", (board) => {
      stateMachine.transition("deleteBoard", board);
    });

    this.addBoardUnsub = eventBus.subscribe("addNewBoard", (board) => {
      stateMachine.transition("addNewBoard", board);
    });
  },

  onExit() {
    this.onViewTaskUnsub();
    this.addTaskUnsub();
    this.editBoardUnsub();
    this.deleteBoardUnsub();
    this.addBoardUnsub();
  },
};
