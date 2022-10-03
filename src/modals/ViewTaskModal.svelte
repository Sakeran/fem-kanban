<script>
  import ViewTaskCard from "../components/UI/ViewTaskCard/ViewTaskCard.svelte";
  import Modal from "../components/Interactive/Modal/Modal.svelte";
  import { currentlyViewedTask, currentState } from "../stores/appState";
  import { eventBus } from "../lib/eventBus";
</script>

<Modal
  open={$currentState == "viewTask"}
  on:requestClose={() => eventBus.dispatch("viewTaskClose")}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <ViewTaskCard
      on:editTask={() => eventBus.dispatch("editTask")}
      on:deleteTask={() => console.log("TODO")}
      on:toggleSubtask={({ detail: { task, subtaskTitle } }) => {
        console.log("todo");
      }}
      on:updateStatus={({ detail: { task, status } }) => {
        console.log("todo");
      }}
      task={$currentlyViewedTask}
    />
  </div>
</Modal>
