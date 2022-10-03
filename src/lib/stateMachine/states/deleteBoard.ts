import { boardToDelete } from "../../../stores/appState";
import { eventBus } from "../../../lib/eventBus";
import type { StateMachineState } from "../types";
import { stateMachine } from "../stateMachine";
import { deleteBoard } from "../../../stores/boardData";

export const DeleteBoardState: StateMachineState = {
  name: "deleteBoard",

  onEnter(board) {
    this.currentBoard = board;
    boardToDelete.set(board);

    this.cancelUnsub = eventBus.subscribe("deleteBoardCancel", () => {
      stateMachine.transition("viewCurrentBoard");
    });

    this.confirmUnsub = eventBus.subscribe("deleteBoardConfirm", () => {
      deleteBoard(board);
      stateMachine.transition("viewCurrentBoard");
    });
  },

  onExit() {
    delete this.currentBoard;
    boardToDelete.set(undefined);

    this.cancelUnsub();
    this.confirmUnsub();
  },
};
