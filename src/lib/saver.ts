import { Board } from "./board/board";

export function loadBoardsFromLocalStorage() {
  const data = window.localStorage.getItem("boardData");

  const boardData = JSON.parse(data);
  const boards = boardData.map((bd) => Board.loadFromData(bd)) as Board[];

  return boards;
}

export function saveBoardsToLocalStorage(boards: Board[]) {
  const data = boards.map((b) => b.serializeToData());

  window.localStorage.setItem("boardData", JSON.stringify(data));
}
