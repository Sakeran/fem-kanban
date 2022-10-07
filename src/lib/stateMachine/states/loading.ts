import {
  loadAppStateFromLocalStorage,
  loadBoardsFromLocalStorage,
} from "../../../lib/saver";
import { Board } from "../../../lib/board/board";
import { loadBoards } from "../../../stores/boardData";
import { mockBoardData } from "../../../helpers/mockBoardData";
import { stateMachine } from "../stateMachine";
import type { StateMachineState } from "../types";
import { colorScheme, sidebarExpanded } from "../../../stores/appControls";

export const LoadingState: StateMachineState = {
  name: "loading",

  onEnter() {
    this.loadBoards();
    this.loadAppState();
    stateMachine.transition("viewCurrentBoard");
  },

  loadBoards() {
    const boards = loadBoardsFromLocalStorage();
    if (boards === null) return this.loadDefaultBoards();

    try {
      loadBoards(boards);
    } catch (e) {
      this.loadDefaultBoards();
    }
  },

  loadAppState() {
    const appState = loadAppStateFromLocalStorage();
    if (appState === null) return;

    colorScheme.set(appState.colorScheme);
    sidebarExpanded.set(appState.sidebarExpanded);
  },

  loadDefaultBoards() {
    loadBoards(mockBoardData.map((bd) => Board.loadFromData(bd)));
  },
};
