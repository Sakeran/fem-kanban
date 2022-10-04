import { eventBus } from "../lib/eventBus";
import { writable } from "svelte/store";
import type { Task } from "../lib/board/task";
import type { Board } from "../lib/board/board";

// Current State Store
export const currentState = writable<string>(undefined);

eventBus.subscribe("stateTransition", (newState) => currentState.set(newState));

// Currently Viewed Task
export const currentlyViewedTask = writable<Task>(undefined);

// Currently Edited Task
export const currentlyEditedTask = writable<Task>(undefined);

// Task to Delete
export const taskToDelete = writable<Task>(undefined);

// Currently Edited Board
export const currentlyEditedBoard = writable<Board>(undefined);

// Board to Delete
export const boardToDelete = writable<Board>(undefined);
