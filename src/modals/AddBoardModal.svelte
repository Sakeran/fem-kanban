<script>
  import { eventBus } from "../lib/eventBus";
  import Modal from "../components/Interactive/Modal/Modal.svelte";
  import EditBoardCard from "../components/UI/EditBoardCard/EditBoardCard.svelte";

  import { currentState } from "../stores/appState";
</script>

<Modal
  open={$currentState == "addNewBoard"}
  on:requestClose={() => eventBus.dispatch("addNewBoardCancel")}
  aria={{ labelledby: "edit-board-card-header" }}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <EditBoardCard
      title="Add New Board"
      submitButtonText="Create New Board"
      name=""
      columns={["Todo", "Doing", "Done"]}
      on:submitBoard={(e) => eventBus.dispatch("addNewBoardCreate", e.detail)}
    />
  </div>
</Modal>
