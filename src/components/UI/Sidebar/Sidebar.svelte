<script lang="ts">
  import ThemeToggle from "../../Interactive/ThemeToggle/ThemeToggle.svelte";
  import SidebarToggle from "../../Interactive/SidebarToggle/SidebarToggle.svelte";
  import BoardTabList from "../../Interactive/BoardTabList/BoardTabList.svelte";

  export let boardData = { boards: [] }; // stub

  let state: "visible" | "hidden" = "hidden";
</script>

<div
  data-expanded={state}
  class="sidebar bg-white dark:bg-gray-dark py-8 flex flex-col border-r border-gray-lines-light dark:border-gray-lines-dark motion-safe:transition-transform motion-safe:ease-in-out"
>
  <div
    class="sidebar-toggle hidden sm:block order-last motion-safe:transition-transform motion-safe:ease-in-out"
  >
    <SidebarToggle bind:state />
  </div>

  <BoardTabList boards={boardData.boards} />
  <div class="px-6 mt-auto mb-4"><ThemeToggle /></div>
</div>

<style lang="postcss">
  .sidebar {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    width: 16.25rem;
  }

  @media (min-width: 64em) {
    .sidebar {
      width: 18.75rem;
    }
  }

  .sidebar[data-expanded="hidden"] {
    transform: translateX(-100%);
  }

  .sidebar[data-expanded="hidden"] > .sidebar-toggle {
    transform: translateX(100%);
  }
</style>
