import { Board } from "./board/board";

const boardDataKey = "kanban-board-data";
const appStateKey = "kanban-app-state";

export function loadBoardsFromLocalStorage() {
  const json = window.localStorage.getItem(boardDataKey);
  if (json === null) return null;

  const boardData = JSON.parse(json);
  const boards = boardData.map((bd) => Board.loadFromData(bd)) as Board[];

  return boards;
}

export function saveBoardsToLocalStorage(boards: Board[]) {
  const boardData = boards.map((b) => b.serializeToData());
  const json = JSON.stringify(boardData);

  window.localStorage.setItem(boardDataKey, json);
}

export function loadAppStateFromLocalStorage() {
  const json = window.localStorage.getItem(appStateKey);
  const appStateData = JSON.parse(json);

  return appStateData;
}

export function saveAppStateToLocalStorage(appStateData) {
  const json = JSON.stringify(appStateData);

  window.localStorage.setItem(appStateKey, json);
}
