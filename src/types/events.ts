import type Task from "src/lib/board/task";

/**
 * Mapping of event names to payloads
 */
export type EventTypes = {
  taskUpdated: Task;
  viewTask: Task;
};

export type Events = keyof EventTypes;

export type EventCallback<E extends Events> = (data?: EventTypes[E]) => void;
