<script>
  import { eventBus } from "../lib/eventBus";
  import Modal from "../components/Interactive/Modal/Modal.svelte";

  import { currentState, boardToDelete } from "../stores/appState";
  import DeleteItemCard from "../components/UI/DeleteItemCard/DeleteItemCard.svelte";
</script>

<Modal
  open={$currentState == "deleteBoard"}
  on:requestClose={() => eventBus.dispatch("deleteBoardCancel")}
  aria={{ labelledby: "delete-item-card-header" }}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <DeleteItemCard
      title="Delete this board?"
      message={`Are you sure you want to delete the '${$boardToDelete.name}' board? This action will remove all columns and tasks and cannot be reversed.`}
      on:confirmDelete={() => eventBus.dispatch("deleteBoardConfirm")}
      on:cancel={() => eventBus.dispatch("deleteBoardCancel")}
    />
  </div>
</Modal>
