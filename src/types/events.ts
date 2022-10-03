import type { BoardDataUpdate } from "src/lib/board/board";
import type Board from "src/lib/board/board";
import type { TaskCreateData, TaskData } from "src/lib/board/task";
import type Task from "src/lib/board/task";

/**
 * Mapping of event names to payloads
 */
export type EventTypes = {
  // Data Events
  taskUpdated: Task;
  boardUpdated: Board;

  // State Machine Events
  stateTransition: string;

  // View Task State Events
  viewTask: Task;
  viewTaskClose: void;

  // Edit Task State Events
  editTask: void;
  editTaskCancel: void;
  editTaskUpdate: TaskData;

  // Delete Task Events
  deleteTask: Task;
  deleteTaskCancel: void;
  deleteTaskConfirm: void;

  // Add Task State Events
  addNewTask: void;
  addNewTaskCreate: TaskCreateData;
  addNewTaskCancel: void;

  // Edit Board Events
  editBoard: Board;
  editBoardCancel: void;
  editBoardUpdate: BoardDataUpdate;
};

export type Events = keyof EventTypes;

export type EventCallback<E extends Events> = (data?: EventTypes[E]) => void;
