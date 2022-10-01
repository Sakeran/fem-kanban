<script lang="ts">
  import Modal from "./components/Interactive/Modal/Modal.svelte";
  import AppLayout from "./components/UI/AppLayout/AppLayout.svelte";
  import EditTaskCard from "./components/UI/EditTaskCard/EditTaskCard.svelte";
  import ViewTaskCard from "./components/UI/ViewTaskCard/ViewTaskCard.svelte";
  import { mockBoardData } from "./helpers/mockBoardData";
  import Board from "./lib/board/board";
  import type Task from "./lib/board/task";
  import { eventBus } from "./lib/eventBus";

  import { colorScheme } from "./stores/appControls";
  import {
    currentBoard,
    loadBoards,
    updateCurrentBoard,
  } from "./stores/boardData";

  // Handle changes to color scheme state
  $: {
    if ($colorScheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  // TEMP: Setup board data
  loadBoards(mockBoardData.map((data) => new Board(data)));

  // View Task Modal
  let currentlyViewedTask: Task;
  eventBus.on("viewTask", (task) => {
    currentlyViewedTask = task;
  });

  // Edit Task Modal
  let showEditTaskModal: boolean = false;
  let editTaskType: "add" | "edit";
  let taskToEdit: Task | undefined;
  eventBus.on("addNewTask", () => {
    editTaskType = "add";
    taskToEdit = undefined;
    showEditTaskModal = true;
  });
</script>

<!-- App Layout -->
<AppLayout />

<!-- View Task Modal -->
<Modal
  open={!!currentlyViewedTask}
  on:requestClose={() => (currentlyViewedTask = undefined)}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <ViewTaskCard
      on:editTask={() => console.log("TODO")}
      on:deleteTask={() => console.log("TODO")}
      on:toggleSubtask={({ detail: { task, subtaskTitle } }) => {
        task.toggleSubtask(subtaskTitle);
        updateCurrentBoard();
      }}
      on:updateStatus={({ detail: { task, status } }) => {
        task.updateStatus(status);
        updateCurrentBoard();
      }}
      task={currentlyViewedTask}
    />
  </div>
</Modal>

<!-- Edit Card Modal -->
<Modal
  open={showEditTaskModal}
  on:requestClose={() => console.log("...close?")}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <EditTaskCard
      boardColumns={$currentBoard.columnNames}
      on:submitTask={(e) => {
        if (editTaskType === "add") {
          $currentBoard.addNewTask(e.detail);
          showEditTaskModal = false;
          updateCurrentBoard();
        }
      }}
    />
  </div>
</Modal>
