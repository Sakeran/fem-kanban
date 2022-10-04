import { currentlyEditedBoard } from "../../../stores/appState";
import { eventBus } from "../../../lib/eventBus";
import type { StateMachineState } from "../types";
import { stateMachine } from "../stateMachine";

export const EditBoardState: StateMachineState = {
  name: "editBoard",

  onEnter(board) {
    this.currentBoard = board;
    currentlyEditedBoard.set(board);

    this.cancelUnsub = eventBus.subscribe("editBoardCancel", () => {
      stateMachine.transition("viewCurrentBoard");
    });

    this.updateUnsub = eventBus.subscribe("editBoardUpdate", (boardData) => {
      this.currentBoard.update(boardData.name, boardData.columns, boardData.columnActions);
      stateMachine.transition("viewCurrentBoard");
    });
  },

  onExit() {
    delete this.currentBoard;
    currentlyEditedBoard.set(undefined);

    this.cancelUnsub();
    this.updateUnsub();
  },
};
