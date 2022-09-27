import Board from "../lib/board/board";
import BoardColumn from "../lib/board/boardColumn";
import { mockBoardData } from "./mockBoardData";

export function createMockBoards() {
  return mockBoardData.map((boardData) => Board.createFromData(boardData));
}

export function createMockColumn() {
  return BoardColumn.createFromData(mockBoardData[0].columns[0]);
}
