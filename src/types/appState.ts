import type { Board } from "./boardTypes";

export interface AppState {
  // UI State
  sidebarExpanded: boolean;

  // Board Data
  boards: Board[];
  currentBoard: Board;
}
