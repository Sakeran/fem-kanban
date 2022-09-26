<script lang="ts">
  import BoardColumns from "../BoardColumns/BoardColumns.svelte";
  import Header from "../Header/Header.svelte";
  import Sidebar from "../Sidebar/Sidebar.svelte";
</script>

<div class="app-layout">
  <div class="app-layout-header"><Header /></div>
  <div class="app-layout-content">
    <Sidebar />
    <div class="absolute inset-0 px-4 sm:px-6 py-6 overflow-auto z-0">
      <BoardColumns />
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
