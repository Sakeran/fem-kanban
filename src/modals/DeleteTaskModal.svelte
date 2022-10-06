<script>
  import { eventBus } from "../lib/eventBus";
  import Modal from "../components/Interactive/Modal/Modal.svelte";

  import { currentState, taskToDelete } from "../stores/appState";
  import DeleteItemCard from "../components/UI/DeleteItemCard/DeleteItemCard.svelte";
</script>

<Modal
  open={$currentState == "deleteTask"}
  on:requestClose={() => eventBus.dispatch("deleteTaskCancel")}
  aria={{ labelledby: "delete-item-card-header" }}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <DeleteItemCard
      title="Delete this task?"
      message={`Are you sure you want to delete the '${$taskToDelete.title}' task and its subtasks? This action cannot be reversed.`}
      on:confirmDelete={() => eventBus.dispatch("deleteTaskConfirm")}
      on:cancel={() => eventBus.dispatch("deleteTaskCancel")}
    />
  </div>
</Modal>
