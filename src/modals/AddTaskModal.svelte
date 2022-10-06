<script>
  import { eventBus } from "../lib/eventBus";
  import Modal from "../components/Interactive/Modal/Modal.svelte";
  import EditTaskCard from "../components/UI/EditTaskCard/EditTaskCard.svelte";

  import { currentState } from "../stores/appState";
  import { currentBoard } from "../stores/boardData";
</script>

<Modal
  open={$currentState == "addNewTask"}
  on:requestClose={() => eventBus.dispatch("addNewTaskCancel")}
  aria={{ labelledby: "edit-task-card-header" }}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <EditTaskCard
      cardTitle="Add New Task"
      submitButtonText="Create Task"
      title=""
      description=""
      status=""
      subtasks={[]}
      boardColumns={$currentBoard.columnNames}
      on:submitTask={(e) => {
        eventBus.dispatch("addNewTaskCreate", e.detail);
      }}
    />
  </div>
</Modal>
