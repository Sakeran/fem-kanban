<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";

  import Card from "../Card/Card.svelte";
  import Heading from "../../Typography/Heading/Heading.svelte";
  import Select from "../../Interactive/Select/Select.svelte";
  import Menu from "../../Interactive/Menu/Menu.svelte";
  import Text from "../../Typography/Text/Text.svelte";
  import SubtaskCheckbox from "../../Interactive/SubtaskCheckbox/SubtaskCheckbox.svelte";

  import type Task from "src/lib/board/task";
  import type Board from "src/lib/board/board";

  export let task: Task;
  export let board: Board;

  let subtasksTotal: number = task.subtasks.length;
  let subtasksFinished: number;
  $: {
    subtasksFinished = task.subtasks.reduce(
      (acc, el) => (el.isCompleted ? acc + 1 : acc),
      0
    );
  }

  const dispatch = createEventDispatcher();

  function handleToggleSubtask(subtaskTitle: string) {
    dispatch("toggleSubtask", { task, subtaskTitle });
  }

  function handleStatusUpdate(e) {
    dispatch("updateStatus", { task, status: e.target.value });
  }

  function handleMenuAction(e) {
    const actionId = e.detail;

    if (actionId === "edit") {
      return dispatch("editTask");
    }

    if (actionId === "delete") {
      return dispatch("deleteTask");
    }
  }
</script>

<Card borderRadius={6} paddingStyle="Modal">
  <div class="flex items-center">
    <Heading element="h2" style="L" classes="text-black dark:text-white grow"
      >{task.title}</Heading
    >
    <div class="relative left-1">
      <!-- <MenuToggle textAlternative="Options Menu" on:click={handleMenuToggle} /> -->
      <Menu
        on:actionClicked={handleMenuAction}
        openButtonText="Options Menu"
        actions={[
          { id: "edit", label: "Edit Task" },
          { id: "delete", label: "Delete Task", style: "destructive" },
        ]}
      />
    </div>
  </div>
  <Text style="L" classes="mt-6 text-gray-medium">{task.description}</Text>
  <fieldset class="mt-6">
    <legend class="sr-only"
      >Subtasks ({subtasksFinished} of {subtasksTotal})</legend
    >
    <div
      class="font-bold text-12p text-gray-medium dark:text-white"
      aria-hidden="true"
    >
      Subtasks ({subtasksFinished} of {subtasksTotal})
    </div>

    <div class="mt-4 flex flex-col gap-2">
      {#each task.subtasks as { title, isCompleted }}
        <SubtaskCheckbox
          on:toggle={() => handleToggleSubtask(title)}
          content={title}
          completed={isCompleted}
        />
      {/each}
    </div>
  </fieldset>
  <Select
    options={board.columns.map((c) => c.name)}
    label="Current Status"
    value={task.status}
    on:change={handleStatusUpdate}
    classes="mt-6"
  />
</Card>
