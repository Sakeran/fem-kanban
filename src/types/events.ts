import type Board from "src/lib/board/board";
import type Task from "src/lib/board/task";

/**
 * Mapping of event names to payloads
 */
export type EventTypes = {
  stateTransition: string;
  taskUpdated: Task;
  boardUpdated: Board;
  viewTask: Task;
  addNewTask: void;
};

export type Events = keyof EventTypes;

export type EventCallback<E extends Events> = (data?: EventTypes[E]) => void;
