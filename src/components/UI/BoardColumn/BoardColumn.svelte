<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import type { BoardColumn } from "../../../lib/board/boardColumn";
  import { createEventDispatcher } from "svelte";

  import Heading from "../../Typography/Heading/Heading.svelte";
  import TodoCard from "../TodoCard/TodoCard.svelte";
  import type { Task } from "../../../lib/board/task";
  import checkReducedMotion from "../../../helpers/checkReducedMotion";

  export let columnData: BoardColumn;

  let draggableTasks;
  $: draggableTasks = [...columnData.tasks];

  const flipDurationMs = checkReducedMotion(150, 0);

  function handleConsider(e) {
    draggableTasks = e.detail.items;
  }

  function handleFinalize(e) {
    columnData.updateTasks(e.detail.items);
    draggableTasks = [...columnData.tasks];
  }

  const dispatch = createEventDispatcher();
  function handleTaskSelect(task: Task) {
    dispatch("taskSelected", task);
  }
</script>

<div class="flex flex-col min-h-full">
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

  <div
    use:dndzone={{
      items: draggableTasks,
      type: "todos",
      dropTargetStyle: {},
      flipDurationMs,
    }}
    on:consider={handleConsider}
    on:finalize={handleFinalize}
    class="mt-6 flex flex-col gap-5 grow"
  >
    {#each draggableTasks as task (task.id)}
      <div animate:flip={{ duration: flipDurationMs }}>
        <TodoCard
          on:click={() => handleTaskSelect(task)}
          title={task.title}
          subtaskTotal={task.subtasks.length}
          subtasksCompleted={task.subtasks.filter((st) => st.isCompleted)
            .length}
        />
      </div>
    {/each}
  </div>
</div>
