<script lang="ts">
  import Modal from "./components/Interactive/Modal/Modal.svelte";
  import AppLayout from "./components/UI/AppLayout/AppLayout.svelte";
  import EditTaskCard from "./components/UI/EditTaskCard/EditTaskCard.svelte";
  import ViewTaskCard from "./components/UI/ViewTaskCard/ViewTaskCard.svelte";
  import type Task from "./lib/board/task";
  import { eventBus } from "./lib/eventBus";
  import { stateMachine } from "./lib/stateMachine/stateMachine";
  import EditTaskModal from "./modals/EditTaskModal.svelte";
  import ViewTaskModal from "./modals/ViewTaskModal.svelte";

  import { colorScheme } from "./stores/appControls";
  import { currentState } from "./stores/appState";
  import { currentBoard, updateCurrentBoard } from "./stores/boardData";

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

</script>

<!-- App Layout -->
<AppLayout />

<!-- View Task Modal -->
<ViewTaskModal />

<!-- Edit Task Modal -->
<EditTaskModal />