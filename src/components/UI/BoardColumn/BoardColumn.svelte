<script lang="ts">
  import { dndzone } from "svelte-dnd-action";
  import { flip } from "svelte/animate";
  import { fade } from "svelte/transition";
  import type { BoardColumn } from "../../../lib/board/boardColumn";
  import { createEventDispatcher } from "svelte";
  import { HsvPicker } from "svelte-color-picker";

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

  // Color Button Handler

  let boardColor;
  $: boardColor = columnData.boardColor || "#49C4E5";
  let pickerContainer;
  let pickerVisible = false;

  function showPicker() {
    pickerVisible = true;
    document.addEventListener("click", handleWindowClick);
  }

  function hidePicker() {
    pickerVisible = false;
    document.removeEventListener("click", handleWindowClick);
  }

  function handleColorButtonClick(e) {
    e.preventDefault();

    if (pickerVisible) return hidePicker();
    return showPicker();
  }

  function handleWindowClick(e) {
    if (pickerContainer && pickerContainer.contains(e.target)) return;
    pickerVisible = false;
  }

  function handleColorChange(e) {
    const { r, g, b, a } = e.detail;
    const rHex = (r < 16 ? "0" : "") + r.toString(16);
    const gHex = (g < 16 ? "0" : "") + g.toString(16);
    const bHex = (b < 16 ? "0" : "") + b.toString(16);
    let newHex = `#${rHex}${gHex}${bHex}`;
    if (a < 1) {
      newHex += Math.floor(a * 255).toString(16);
    }
    boardColor = newHex;
    updateColumnColor(newHex);
  }

  // Debaounce color update
  let updateColorHandle;
  function updateColumnColor(hex) {
    if (updateColorHandle) {
      clearTimeout(updateColorHandle);
      updateColorHandle = undefined;
    }

    updateColorHandle = setTimeout(() => {
      columnData.updateColor(hex);
      updateColorHandle = undefined;
    }, 100);
  }
</script>

<div class="flex flex-col min-h-full">
  <div class="flex gap-3 items-center">
    <div class="relative flex" bind:this={pickerContainer}>
      <button
        style:background-color={boardColor}
        class="w-[0.9375rem] aspect-square rounded-round"
        on:click={handleColorButtonClick}
        ><span class="sr-only">Choose board color</span></button
      >
      {#if pickerVisible}
        <div
          transition:fade={{ duration: checkReducedMotion(100, 0) }}
          class="absolute left-full top-full z-10"
          style="font-family: sans-serif;"
        >
          <HsvPicker
            startColor={boardColor}
            on:colorChange={handleColorChange}
          />
        </div>
      {/if}
    </div>
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
