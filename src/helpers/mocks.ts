import { Board } from "../lib/board/board";
import { mockBoardData } from "./mockBoardData";

export function createMockBoards() {
  return mockBoardData.map((boardData) => Board.loadFromData(boardData));
}

export function createMockColumn() {
  const board = createMockBoards();
  return board[0].columns[0];
}

export function createMockTask() {
  const column = createMockColumn();
  return column.tasks[0];
}
