<script lang="ts">
  import Heading from "../../Typography/Heading/Heading.svelte";
  import BoardColumn from "../BoardColumn/BoardColumn.svelte";
  import { currentBoard } from "../../../stores/boardData";
  import Button from "../../Interactive/Button/Button.svelte";
  import { eventBus } from "../../../lib/eventBus";
  import { onDestroy, onMount, tick } from "svelte";

  function handleTaskSelected(e) {
    eventBus.dispatch("viewTask", e.detail);
  }

  // Track the columns' containing element, as well as the "new column" button,
  // to ensure that the button is always as tall as the container, and is
  // always in view.
  let container: HTMLDivElement;
  let newColumnButton: HTMLButtonElement;

  onMount(() => {
    container = newColumnButton.closest(".columns-container")
      .parentElement as HTMLDivElement;

    container.addEventListener("scroll", computeButtonOffset);
    computeButtonHeight();
  });

  onDestroy(() => {
    container.removeEventListener("scroll", computeButtonOffset);
  });

  $: {
    // Re-compute button height whenever the currentBoard changes.
    $currentBoard;
    tick().then(() => {
      computeButtonHeight();
    });
  }

  function computeButtonHeight() {
    if (!newColumnButton) return;

    // Button should be as tall as the containing element, minus padding.
    const styles = window.getComputedStyle(container);

    const paddingStyle = styles.getPropertyValue("padding-top");
    const padding = parseInt(paddingStyle.slice(0, paddingStyle.length - 2));

    newColumnButton.style.height = container.clientHeight - padding * 2 + "px";
  }

  function computeButtonOffset() {
    if (!newColumnButton) return;

    newColumnButton.style.marginTop = container.scrollTop + "px";
  }
</script>

<svelte:window on:resize={computeButtonHeight} />

<!-- Columns Container -->
<div
  class="columns-container flex gap-6 motion-safe:transition-transform motion-safe:ease-in-out"
>
  {#if $currentBoard}
    {#if $currentBoard.columns.length > 0}
      {#each $currentBoard.columns || [] as column}
        <div class="basis-[17.5rem] shrink-0">
          <BoardColumn
            columnData={column}
            on:taskSelected={handleTaskSelected}
          />
        </div>
      {/each}
      <!-- Add Columns Button -->
      <button
        class="new-column-button relative basis-[17.5rem] shrink-0 rounded-sm grid place-items-center text-gray-medium hocus:text-main-purple-normal"
        bind:this={newColumnButton}
        on:click={() => eventBus.dispatch("editBoard", $currentBoard)}
        ><Heading element="span" style="XL" classes="z-10"
          ><span aria-hidden="true">+</span> New Column</Heading
        ></button
      >
    {:else}
      <div
        class="absolute inset-0 flex flex-col items-center justify-center gap-6 lg:gap-8 text-gray-medium"
      >
        <Heading element="p" style="L"
          >This board is empty. Create a new column to get started.</Heading
        >

        <Button
          style="PrimaryNarrow"
          on:click={() => eventBus.dispatch("editBoard", $currentBoard)}
          ><span><span aria-hidden="true">+ </span>Add New Column</span></Button
        >
      </div>
    {/if}
  {:else}
    <div
      class="absolute inset-0 flex flex-col items-center justify-center gap-6 lg:gap-8 text-gray-medium"
    >
      <Heading element="p" style="L"
        >You haven't yet created any boards. Create a new board to get started.</Heading
      >

      <Button
        style="PrimaryNarrow"
        on:click={() => eventBus.dispatch("addNewBoard")}
        ><span><span aria-hidden="true">+ </span>Add New Board</span></Button
      >
    </div>
  {/if}
</div>

<style lang="postcss">
  .new-column-button {
    background: linear-gradient(to bottom, hsl(219 62% 95%), hsl(220 60% 96%));

    transition: color 150ms ease-in-out;
  }

  .new-column-button:focus-visible {
    outline: 1px solid theme("colors.main-purple.normal");
  }

  .new-column-button::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background-color: hsl(0 0% 0%);
    background-color: theme("colors.main-purple.normal");
    opacity: 0;
    transition: opacity 150ms ease-in-out;
  }

  .new-column-button:is(:hover, :focus-visible)::before {
    opacity: 0.125;
  }

  :global(.dark) .new-column-button {
    background-image: linear-gradient(
      to bottom,
      hsl(235 12% 19% / 0.25),
      hsl(240 14% 17% / 0.25)
    );
  }

  :global(.dark) .new-column-button::before {
    background-color: black;
  }
</style>
