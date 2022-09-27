/**
 * Stores for board data
 */

import type Board from "src/lib/board/board";
import { derived, writable } from "svelte/store";

// All Boards

export const boards = writable([] as Board[]);

export function loadBoards(boardData: Board[]) {
  boards.set(boardData);
}

// Current Board

export const currentBoardId = writable("0" as string);

export function setCurrentBoardId(boardId: string) {
  currentBoardId.set(boardId);
}

export const currentBoard = derived(
  [boards, currentBoardId],
  ([allBoards, id]) => {
    if (id === undefined) return undefined;
    const board = allBoards.find((b) => b.id === id);
    return board || undefined;
  }
);
