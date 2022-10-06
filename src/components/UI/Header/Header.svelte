<script lang="ts">
  import Logo from "../../Misc/Logo/Logo.svelte";
  import IconButton from "../../Interactive/IconButton/IconButton.svelte";
  import Menu from "../../Interactive/Menu/Menu.svelte";
  import Button from "../../Interactive/Button/Button.svelte";
  import { createEventDispatcher } from "svelte";
  import { currentBoard } from "../../../stores/boardData";

  let currentBoardName: string;
  $: currentBoardName = $currentBoard ? $currentBoard.name : "";

  // Note: toggledBoard is just used to update the chevron icon, and isn't
  // synced to anything outside this component.
  let toggledBoard: boolean = false;

  const dispatch = createEventDispatcher();

  function handleToggleBoards() {
    dispatch("toggleBoardsMenu");
    toggledBoard = !toggledBoard;
  }
</script>

<header
  class="flex bg-white dark:bg-gray-dark sm:border-b sm:border-gray-lines-light dark:sm:border-gray-lines-dark"
>
  <div
    class="sm:min-w-[16.25rem] lg:min-w-[18.75rem] px-4 py-5 sm:px-6 sm:py-7 lg:py-9 lg:pr-8 sm:border-r sm:border-gray-lines-light dark:sm:border-gray-lines-dark"
  >
    <Logo />
  </div>

  <div class="current-board relative flex gap-2 items-center">
    <h2
      class:opacity-50={!$currentBoard}
      class="sm:ml-6 font-bold text-black dark:text-white text-18p sm:text-20p lg:text-24p leading-23/18 sm:leading-auto"
    >
      {currentBoardName || "(No Board Selected)"}
    </h2>
    <button
      class="text-main-purple-normal hocus:text-main-purple-hover sm:hidden"
      on:click={handleToggleBoards}
      ><svg
        data-toggled={toggledBoard || null}
        class="[&[data-toggled]]:-rotate-180 motion-safe:transition-transform motion-safe:ease-in-out"
        width="9"
        height="7"
        viewBox="0 0 9 7"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="2" />
      </svg>
      <span class="sr-only">Open Board Selection</span></button
    >
  </div>
  <div class="ml-auto mr-4 flex items-center gap-4 sm:gap-5">
    <!-- (Mobile-Only) Icon Add Task Button  -->
    <div class="sm:hidden">
      <IconButton
        textAlternative="Add New Task"
        disabled={$currentBoard ? $currentBoard.columns.length == 0 : false}
        on:click={() => dispatch("addNewTask")}
        ><svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.368 12V7.344H12V4.632H7.368V0H4.656V4.632H0V7.344H4.656V12H7.368Z"
            fill="white"
          />
        </svg></IconButton
      >
    </div>
    <!-- (Tablet/Desktop Only) Add Task Button  -->
    <div class="hidden sm:block">
      <Button
        style="PrimaryNarrow"
        on:click={() => dispatch("addNewTask")}
        disabled={$currentBoard ? $currentBoard.columns.length == 0 : false}
        ><span><span aria-hidden="true">+ </span>Add New Task</span></Button
      >
    </div>

    <!-- Current Board Options Menu  -->
    <Menu
      openButtonText="Board Options"
      alignMenu="end"
      actions={[
        { id: "editBoard", label: "Edit Board" },
        { id: "deleteBoard", label: "Delete Board", style: "destructive" },
      ]}
      on:actionClicked={(e) => dispatch(e.detail)}
    />
  </div>
</header>

<style lang="postcss">
  .current-board {
    border-radius: 0.25rem;
  }

  .current-board:focus-within {
    outline: 1px solid theme("colors.main-purple.normal");
    outline-offset: 4px;
  }

  .current-board button:focus-visible {
    outline: none;
  }

  .current-board button::after {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
</style>
