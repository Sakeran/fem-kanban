import type { InputListAction } from "src/components/Interactive/InputList/InputList.svelte";
import type { Board } from "src/lib/board/board";
import type { TaskData, Task } from "src/lib/board/task";

/**
 * Mapping of event names to payloads
 */
export type EventTypes = {
  // App State Events
  colorSchemeToggled: 'dark' | 'light';
  sidebarToggled: boolean;

  // Data Events
  taskUpdated: Task;
  boardUpdated: Board;

  // State Machine Events
  stateTransition: string;

  // View Task State Events
  viewTask: Task;
  viewTaskClose: void;
  viewTaskToggleSubtask: string;
  viewTaskUpdateStatus: string;

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
  addNewTaskCreate: {
    title: string;
    description: string;
    subtasks: string[];
    status: string;
  };
  addNewTaskCancel: void;

  // Edit Board Events
  editBoard: Board;
  editBoardCancel: void;
  editBoardUpdate: {
    name: string;
    columns: string[];
    columnActions: InputListAction;
  };

  // Delete Board Events
  deleteBoard: Board;
  deleteBoardCancel: void;
  deleteBoardConfirm: void;

  // Add Board Events
  addNewBoard: void;
  addNewBoardCancel: void;
  addNewBoardCreate: {
    name: string;
    columns: string[];
  };
};

export type Events = keyof EventTypes;

export type EventCallback<E extends Events> = (data?: EventTypes[E]) => void;
