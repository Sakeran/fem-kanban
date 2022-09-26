<script lang="ts">
  import Heading from "../../Typography/Heading/Heading.svelte";
  import BoardColumn from "../BoardColumn/BoardColumn.svelte";
  import { getAppState } from "../../../stores/appStore";

  export let forceExpanded: boolean = false;

  const appState = getAppState();
</script>

<!-- Columns Container -->
<div
  data-sidebar-expanded={$appState.sidebarExpanded || forceExpanded || null}
  class="columns-container flex gap-6 motion-safe:transition-transform motion-safe:ease-in-out"
>
  {#each $appState.currentBoard.columns as column}
    <div class="basis-[17.5rem] shrink-0">
      <BoardColumn columnData={column} />
    </div>
  {/each}
  <!-- Add Columns Button -->
  <div class="relative basis-[17.5rem] shrink-0">
    <button
      class="new-column-button absolute top-0 bottom-0 left-0 w-full rounded-sm grid place-items-center text-gray-medium hocus:text-main-purple-normal"
      ><Heading style="XL" classes="z-10"
        ><span aria-hidden="true">+</span> New Column</Heading
      ></button
    >
  </div>
</div>

<style lang="postcss">
  .columns-container {
    transform: translateX(0);
  }

  .columns-container[data-sidebar-expanded="true"] {
    transform: translateX(16.25rem);
  }

  @media (min-width: 64em) {
    .columns-container[data-sidebar-expanded="true"] {
      transform: translateX(18.75rem);
    }
  }

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
