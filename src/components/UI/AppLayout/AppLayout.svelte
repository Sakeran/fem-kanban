<script lang="ts">
  import BoardTabList from "../../Interactive/BoardTabList/BoardTabList.svelte";
  import ThemeToggle from "../../Interactive/ThemeToggle/ThemeToggle.svelte";
  import { colorScheme, sidebarExpanded } from "../../../stores/appControls";
  import BoardColumns from "../BoardColumns/BoardColumns.svelte";
  import Header from "../Header/Header.svelte";
  import Sidebar from "../Sidebar/Sidebar.svelte";
  import {
    boardTabOptions,
    currentBoard,
    currentBoardId,
    setCurrentBoardId,
  } from "../../../stores/boardData";
  import { eventBus } from "../../../lib/eventBus";

  let mobileMenuVisible: boolean = false;
</script>

<div class="app-layout bg-gray-light dark:bg-gray-very-dark">
  <div class="app-layout-header z-20">
    <Header
      on:toggleBoardsMenu={() => (mobileMenuVisible = !mobileMenuVisible)}
      on:addNewTask={() => eventBus.dispatch("addNewTask")}
      on:editBoard={() => eventBus.dispatch("editBoard", $currentBoard)}
      on:deleteBoard={() => eventBus.dispatch("deleteBoard", $currentBoard)}
    />
  </div>
  <main class="app-layout-content">
    <!-- Mobile Menu -->
    <div
      data-visible={mobileMenuVisible || null}
      class="app-layout-mobile-menu absolute inset-0 bg-black/50 z-10 pt-4 sm:hidden"
      on:click|self={() => (mobileMenuVisible = false)}
    >
      <div
        class="bg-white dark:bg-gray-dark py-4 max-w-[16.5rem] mx-auto flex flex-col gap-4 rounded-lg"
      >
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
    </div>

    <div
      data-sidebar-expanded={$sidebarExpanded}
      class="app-layout-sidebar hidden sm:block z-20"
    >
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
    position: relative;

    display: flex;
    flex-direction: column;

    min-height: 100vh;
  }

  .app-layout-mobile-menu {
    visibility: hidden;
  }

  .app-layout-mobile-menu > div {
    box-shadow: 0 0.25rem 0.375rem hsl(217 36% 33% / 0.115);
  }

  .app-layout-mobile-menu[data-visible] {
    visibility: visible;
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
