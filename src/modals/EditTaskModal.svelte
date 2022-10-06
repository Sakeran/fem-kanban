<script>
  import { eventBus } from "../lib/eventBus";
  import Modal from "../components/Interactive/Modal/Modal.svelte";
  import EditTaskCard from "../components/UI/EditTaskCard/EditTaskCard.svelte";

  import { currentState, currentlyEditedTask } from "../stores/appState";
  import { currentBoard } from "../stores/boardData";
</script>

<Modal
  open={$currentState == "editTask"}
  on:requestClose={() => eventBus.dispatch("editTaskCancel")}
  aria={{ labelledby: "edit-task-card-header" }}
>
  <div class="w-screen max-w-[30rem] mx-auto p-4 box-content">
    <EditTaskCard
      cardTitle="Edit Task"
      submitButtonText="Save Changes"
      title={$currentlyEditedTask.title}
      description={$currentlyEditedTask.description}
      status={$currentlyEditedTask.status}
      subtasks={$currentlyEditedTask.subtasks.map((st) => st.title)}
      boardColumns={$currentBoard.columnNames}
      on:submitTask={(e) => {
        eventBus.dispatch("editTaskUpdate", e.detail);
      }}
    />
  </div>
</Modal>
