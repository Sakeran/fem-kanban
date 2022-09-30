import Task from "../lib/board/task";
import Board from "../lib/board/board";
import BoardColumn from "../lib/board/boardColumn";
import { mockBoardData } from "./mockBoardData";

export function createMockBoards() {
  return mockBoardData.map((boardData) => new Board(boardData));
}

export function createMockColumn() {
  const board = createMockBoards();
  return board[0].columns[0];
}

export function createMockTask() {
  const column = createMockColumn();
  return column.tasks[0];
}
