import { Board } from "./board/board";

const boardDataKey = "kanban-board-data";

export function loadBoardsFromLocalStorage() {
  const json = window.localStorage.getItem(boardDataKey);
  const boardData = JSON.parse(json);
  const boards = boardData.map((bd) => Board.loadFromData(bd)) as Board[];

  return boards;
}

export function saveBoardsToLocalStorage(boards: Board[]) {
  const boardData = boards.map((b) => b.serializeToData());
  const json = JSON.stringify(boardData);

  window.localStorage.setItem(boardDataKey, json);
}
