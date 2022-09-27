<script lang="ts">
  import type BoardColumn from "../../../lib/board/boardColumn";
  import { createEventDispatcher } from "svelte";

  import Heading from "../../Typography/Heading/Heading.svelte";
  import TodoCard from "../TodoCard/TodoCard.svelte";

  export let columnData: BoardColumn;

  const dispatch = createEventDispatcher();
  function handleTaskSelect(taskId: string) {
    dispatch("taskSelected", taskId);
  }
</script>

<div>
  <div class="flex gap-3 items-center">
    <div
      style:background-color={columnData.boardColor || "#49C4E5"}
      class="w-[0.9375rem] aspect-square rounded-round"
      aria-hidden="true"
    />
    <Heading style="S" element="h3" classes="uppercase text-gray-medium">
      {columnData.name}
      {columnData.tasks.length ? `(${columnData.tasks.length})` : ""}
    </Heading>
  </div>

  <div class="mt-6 flex flex-col gap-5">
    {#each columnData.tasks as task}
      <div>
        <TodoCard
          on:click={() => handleTaskSelect(task.id)}
          title={task.title}
          subtaskTotal={task.subtasks.length}
          subtasksCompleted={task.subtasks.filter((st) => st.isCompleted)
            .length}
        />
      </div>
    {/each}
  </div>
</div>
