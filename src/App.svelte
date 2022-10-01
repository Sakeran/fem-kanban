<script lang="ts">
  import Modal from "./components/Interactive/Modal/Modal.svelte";
  import AppLayout from "./components/UI/AppLayout/AppLayout.svelte";
  import ViewTaskCard from "./components/UI/ViewTaskCard/ViewTaskCard.svelte";
  import { mockBoardData } from "./helpers/mockBoardData";
  import Board from "./lib/board/board";
  import type Task from "./lib/board/task";
  import { eventBus } from "./lib/eventBus";

  import { colorScheme } from "./stores/appControls";
  import { loadBoards } from "./stores/boardData";

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
      on:toggleSubtask={() => console.log("toggle")}
      task={currentlyViewedTask}
    />
  </div>
</Modal>
