import { loadBoardsFromLocalStorage } from "../../../lib/saver";
// import { mockBoardData } from "../../../helpers/mockBoardData";
import { Board } from "../../../lib/board/board";
import { loadBoards } from "../../../stores/boardData";
import { mockBoardData } from "../../../helpers/mockBoardData";
import { stateMachine } from "../stateMachine";
import type { StateMachineState } from "../types";

export const LoadingState: StateMachineState = {
  name: "loading",

  onEnter() {
    this.loadBoards();
  },

  async loadBoards() {
    try {
      const boards = loadBoardsFromLocalStorage();
      loadBoards(boards);

      stateMachine.transition("viewCurrentBoard");
    } catch (e) {
      loadBoards(mockBoardData.map((bd) => Board.loadFromData(bd)));
      stateMachine.transition("viewCurrentBoard");
    }
  },
};
