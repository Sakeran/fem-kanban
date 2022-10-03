<script lang="ts">
  import AppLayout from "./components/UI/AppLayout/AppLayout.svelte";
  import { stateMachine } from "./lib/stateMachine/stateMachine";
  import DeleteTaskModal from "./modals/DeleteTaskModal.svelte";
  import EditTaskModal from "./modals/EditTaskModal.svelte";
  import ViewTaskModal from "./modals/ViewTaskModal.svelte";

  import { colorScheme } from "./stores/appControls";

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

 <!-- Delete Task Modal  -->
 <DeleteTaskModal />