import { mockBoardData } from "../../../helpers/mockBoardData";
import { Board } from "../../../lib/board/board";
import { loadBoards } from "../../../stores/boardData";
import { stateMachine } from "../stateMachine";
import type { StateMachineState } from "../types";

export const LoadingState: StateMachineState = {
  name: "loading",

  onEnter() {
    this.loadBoards();
  },

  async loadBoards() {
    // TEMP: Setup board data
    loadBoards(mockBoardData.map((data) => Board.loadFromData(data)));
    stateMachine.transition("viewCurrentBoard");
  },
};
