<script lang="ts">
  import { sidebarExpanded } from "../../../stores/appControls";
  import BoardColumns from "../BoardColumns/BoardColumns.svelte";
  import Header from "../Header/Header.svelte";
  import Sidebar from "../Sidebar/Sidebar.svelte";
</script>

<div class="app-layout bg-gray-light dark:bg-gray-very-dark">
  <div class="app-layout-header"><Header /></div>
  <main class="app-layout-content">
    <div data-sidebar-expanded={$sidebarExpanded} class="app-layout-sidebar hidden sm:block">
      <Sidebar />
    </div>
    <div class="app-layout-columns relative">
      <div class="absolute inset-0 px-4 sm:px-6 py-6 overflow-auto">
        <BoardColumns />
      </div>
    </div>
  </main>
</div>

<style lang="postcss">
  .app-layout {
    display: flex;
    flex-direction: column;

    min-height: 100vh;
  }

  .app-layout-content {
    display: flex;
    position: relative;
    flex-grow: 1;
  }

  .app-layout-sidebar {
    flex: 0 0 16.25rem;
    transition: flex-basis 150ms ease-in-out;
  }

  .app-layout-sidebar[data-sidebar-expanded="false"] {
    flex-basis: 0;
  }

  @media screen and (min-width: 64em) {
    .app-layout-sidebar {
      flex: 0 0 18.75rem;
    }
  }

  .app-layout-columns {
    flex-grow: 1;
  }
</style>
