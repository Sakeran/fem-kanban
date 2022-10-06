<script>
  import ViewTaskCard from "../components/UI/ViewTaskCard/ViewTaskCard.svelte";
  import Modal from "../components/Interactive/Modal/Modal.svelte";
  import { currentlyViewedTask, currentState } from "../stores/appState";
  import { eventBus } from "../lib/eventBus";
</script>

<Modal
  open={$currentState == "viewTask"}
  on:requestClose={() => eventBus.dispatch("viewTaskClose")}
  aria={{labelledby:"view-task-card-header"}}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <ViewTaskCard
      on:editTask={() => eventBus.dispatch("editTask")}
      on:deleteTask={() => eventBus.dispatch("deleteTask")}
      on:toggleSubtask={({ detail: { subtaskTitle } }) => {
        eventBus.dispatch("viewTaskToggleSubtask", subtaskTitle);
      }}
      on:updateStatus={({ detail: { status } }) => {
        eventBus.dispatch("viewTaskUpdateStatus", status);
      }}
      task={$currentlyViewedTask}
    />
  </div>
</Modal>
