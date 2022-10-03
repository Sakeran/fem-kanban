/**
 * Stores for board data
 */

import type { BoardDataUpdate } from "src/lib/board/board";
import Board from "../lib/board/board";
import { derived, get, writable } from "svelte/store";

// All Boards

export const boards = writable([] as Board[]);

export function loadBoards(boardData: Board[]) {
  boards.set(boardData);
}

export function addBoard(boardData: BoardDataUpdate) {
  const newBoard = Board.createFromUpdate(boardData);

  const newBoards = [...get(boards), newBoard];
  boards.set(newBoards);

  return newBoard;
}

export function deleteBoard(board: Board) {
  const allBoards = get(boards);

  const isCurrentBoard = get(currentBoardId) === board.id;

  const newBoards = allBoards.filter((b) => b !== board);

  if (isCurrentBoard) {
    setCurrentBoardId(newBoards.length > 0 ? newBoards[0].id : undefined);
  }

  boards.set(newBoards);
}

// Current Board

export const currentBoardId = writable("0" as string);

export function setCurrentBoardId(boardId: string) {
  currentBoardId.set(boardId);
}

// Create a private store to use in the currentBoard derivation.
// Can be toggled to trigger a re-render of the current board screen.
let _updateBoard = false;
const _updateBoardStore = writable(false);

export function updateCurrentBoard() {
  _updateBoard = !_updateBoard;
  _updateBoardStore.set(_updateBoard);
}

export const currentBoard = derived(
  [boards, currentBoardId, _updateBoardStore],
  ([allBoards, id, _updateBoard]) => {
    if (id === undefined) return undefined;
    const board = allBoards.find((b) => b.id === id);
    return board || undefined;
  }
);
