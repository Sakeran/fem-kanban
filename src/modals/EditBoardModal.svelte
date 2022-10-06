<script>
  import { eventBus } from "../lib/eventBus";
  import Modal from "../components/Interactive/Modal/Modal.svelte";
  import EditBoardCard from "../components/UI/EditBoardCard/EditBoardCard.svelte";

  import { currentState, currentlyEditedBoard } from "../stores/appState";
  import { currentBoard } from "../stores/boardData";
</script>

<Modal
  open={$currentState == "editBoard"}
  on:requestClose={() => eventBus.dispatch("editBoardCancel")}
  aria={{ labelledby: "edit-board-card-header" }}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <EditBoardCard
      title="Edit Board"
      submitButtonText="Save Changes"
      name={$currentlyEditedBoard.name}
      columns={$currentBoard.columns.map((c) => c.name)}
      on:submitBoard={(e) => eventBus.dispatch("editBoardUpdate", e.detail)}
    />
  </div>
</Modal>
