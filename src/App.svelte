<script lang="ts">
  import AppLayout from "./components/UI/AppLayout/AppLayout.svelte";
  import { eventBus } from "./lib/eventBus";
  import {
    saveAppStateToLocalStorage,
    saveBoardsToLocalStorage,
  } from "./lib/saver";
  import { stateMachine } from "./lib/stateMachine/stateMachine";
  import AddBoardModal from "./modals/AddBoardModal.svelte";
  import AddTaskModal from "./modals/AddTaskModal.svelte";
  import DeleteBoardModal from "./modals/DeleteBoardModal.svelte";
  import DeleteTaskModal from "./modals/DeleteTaskModal.svelte";
  import EditBoardModal from "./modals/EditBoardModal.svelte";
  import EditTaskModal from "./modals/EditTaskModal.svelte";
  import ViewTaskModal from "./modals/ViewTaskModal.svelte";

  import { colorScheme, sidebarExpanded } from "./stores/appControls";
  import { boards, updateBoardTabOptions } from "./stores/boardData";

  // Setup state machine.
  stateMachine.start("loading");

  // Handle changes to color scheme state
  $: {
    if ($colorScheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  // Handle boards data persistence
  let willSaveBoards = false;
  function handleSaveBoards() {
    if (willSaveBoards) return;

    willSaveBoards = true;
    setTimeout(() => {
      saveBoardsToLocalStorage($boards);
      willSaveBoards = false;
    }, 0);
  }
  eventBus.on("boardUpdated", handleSaveBoards);
  eventBus.on("deleteBoardConfirm", handleSaveBoards);
  eventBus.on("addNewBoardCreate", handleSaveBoards);

  // Handle app state persistence
  let willSaveAppState = false;
  function handleSaveAppState() {
    if (willSaveAppState) return;

    willSaveAppState = true;
    setTimeout(() => {
      saveAppStateToLocalStorage({
        sidebarExpanded: $sidebarExpanded,
        colorScheme: $colorScheme,
      });
      willSaveAppState = false;
    }, 0);
  }
  eventBus.on("sidebarToggled", handleSaveAppState);
  eventBus.on("colorSchemeToggled", handleSaveAppState);

  // We need to manually trigger an update of the board tabs
  // when a board is updated, since the board store itself isn't
  // mutated.
  eventBus.on("boardUpdated", () => {
    updateBoardTabOptions();
  })

</script>

<!-- App Layout -->
<AppLayout />

<!-- View Task Modal -->
<ViewTaskModal />

<!-- Edit Task Modal -->
<EditTaskModal />

<!-- Delete Task Modal  -->
<DeleteTaskModal />

<!-- Add New Task Modal -->
<AddTaskModal />

<!-- Edit Board Modal -->
<EditBoardModal />

<!-- Delete Board Modal -->
<DeleteBoardModal />

<!-- Add New Board Modal -->
<AddBoardModal />
