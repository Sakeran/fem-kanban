<script lang="ts">
  import type { Board } from "src/types/boardTypes";
  import BoardColumns from "../BoardColumns/BoardColumns.svelte";
  import Header from "../Header/Header.svelte";
  import Sidebar from "../Sidebar/Sidebar.svelte";

  // TODO - These top-level components should be more tightly coupled
  // to the data layer.
  export let boardData: { boards: Board[] };
  export let currentBoard: Board;
</script>

<div class="app-layout">
  <div class="app-layout-header"><Header /></div>
  <div class="app-layout-content">
    <Sidebar {boardData} />
    <div class="absolute inset-0 px-4 sm:px-6 py-6 overflow-auto z-0">
      <BoardColumns board={currentBoard} />
    </div>
  </div>
</div>

<style lang="postcss">
  .app-layout {
    display: flex;
    flex-direction: column;

    min-height: 100vh;
  }

  .app-layout-header {
  }

  .app-layout-content {
    position: relative;
    flex-grow: 1;
  }
</style>
