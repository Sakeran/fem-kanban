<script lang="ts">
  import AppLayout from "./components/UI/AppLayout/AppLayout.svelte";
  import { eventBus } from "./lib/eventBus";
  import { saveBoardsToLocalStorage } from "./lib/saver";
  import { stateMachine } from "./lib/stateMachine/stateMachine";
  import AddBoardModal from "./modals/AddBoardModal.svelte";
  import AddTaskModal from "./modals/AddTaskModal.svelte";
  import DeleteBoardModal from "./modals/DeleteBoardModal.svelte";
  import DeleteTaskModal from "./modals/DeleteTaskModal.svelte";
  import EditBoardModal from "./modals/EditBoardModal.svelte";
  import EditTaskModal from "./modals/EditTaskModal.svelte";
  import ViewTaskModal from "./modals/ViewTaskModal.svelte";

  import { colorScheme } from "./stores/appControls";
  import { boards } from "./stores/boardData";

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

  // Handle data persistence
  let willSave = false;
  function handleSave() {

    if (willSave) return;

    willSave = true;
    setTimeout(() => {
      saveBoardsToLocalStorage($boards);
      willSave = false;
    }, 0);
  }
  eventBus.on("boardUpdated", handleSave);
  eventBus.on("deleteBoardConfirm", handleSave);
  eventBus.on("addNewBoardCreate", handleSave);
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
