<script lang="ts">
  import ThemeToggle from "../../Interactive/ThemeToggle/ThemeToggle.svelte";
  import SidebarToggle from "../../Interactive/SidebarToggle/SidebarToggle.svelte";
  import BoardTabList from "../../Interactive/BoardTabList/BoardTabList.svelte";

  import { colorScheme, sidebarExpanded } from "../../../stores/appControls";
  import {
    boardTabOptions,
    currentBoardId,
    setCurrentBoardId,
  } from "../../../stores/boardData";
  import { eventBus } from "../../../lib/eventBus";

  export let forceExpanded: boolean = false;

  function handleToggle(e) {
    sidebarExpanded.set(e.detail);
    eventBus.dispatch("sidebarToggled", e.detail);
  }
</script>

<div
  data-expanded={$sidebarExpanded || forceExpanded}
  data-testid="sidebar"
  class="sidebar bg-white dark:bg-gray-dark py-8 flex flex-col border-r border-gray-lines-light dark:border-gray-lines-dark motion-safe:transition-transform motion-safe:ease-in-out"
>
  <div
    class="sidebar-toggle hidden sm:block order-last motion-safe:transition-transform motion-safe:ease-in-out"
  >
    <SidebarToggle
      sidebarExpanded={$sidebarExpanded || forceExpanded}
      on:toggle={handleToggle}
    />
  </div>

  <BoardTabList
    boardOptions={$boardTabOptions}
    selectedBoardId={$currentBoardId}
    on:boardSelected={(e) => setCurrentBoardId(e.detail)}
    on:createNewBoard={() => eventBus.dispatch("addNewBoard")}
  />
  <div class="px-6 mt-auto mb-4">
    <ThemeToggle
      theme={$colorScheme || "light"}
      on:toggled={(e) => {
        colorScheme.set(e.detail);
        eventBus.dispatch("colorSchemeToggled", e.detail);
      }}
    />
  </div>
</div>

<style lang="postcss">
  .sidebar {
    position: absolute;
    top: -1px;
    bottom: 0;
    left: 0;
    z-index: 1;

    width: 16.25rem;
  }

  @media (min-width: 64em) {
    .sidebar {
      width: 18.75rem;
    }
  }

  .sidebar[data-expanded="false"] {
    transform: translateX(-100%);
  }

  .sidebar[data-expanded="false"] > .sidebar-toggle {
    transform: translateX(100%);
  }
</style>
