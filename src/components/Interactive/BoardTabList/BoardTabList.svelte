<script context="module" lang="ts">
</script>

<script lang="ts">
  import type { Board } from "../../../lib/board/board";

  import { createEventDispatcher } from "svelte";

  import Heading from "../../Typography/Heading/Heading.svelte";

  export let label: string = "All Boards";
  export let selectedBoardId: string = undefined;
  export let boardOptions: [Board["id"], Board["name"]][] = [];

  if (selectedBoardId === undefined && boardOptions.length > 0)
    selectedBoardId = boardOptions[0][0];

  const dispatch = createEventDispatcher();

  function handleSelection(id) {
    if (!boardOptions.find(([bid, _name]) => bid == id)) return;

    selectedBoardId = id;
    dispatch("boardSelected", id);
  }

  function handleCreateNew() {
    dispatch("createNewBoard");
  }
</script>

<div>
  <Heading
    element="h2"
    classes="text-gray-medium pl-6 lg:pl-8 uppercase"
    style="S"
    >{label} {boardOptions.length ? `(${boardOptions.length})` : ""}
  </Heading>
  <div class="mt-5 flex flex-col">
    {#each boardOptions as [id, name]}
      <button
        data-selected={selectedBoardId === id || null}
        class="flex gap-3 lg:gap-4 items-center min-h-button-l pl-6 lg:pl-8 rounded-tr-full rounded-br-full bg-transparent hocus:text-main-purple-normal hocus:bg-main-purple-normal/10 dark:hocus:bg-white text-gray-medium [&[data-selected]]:bg-main-purple-normal hocus:[&[data-selected]]:bg-main-purple-normal [&[data-selected]]:text-white outline-2 focus-visible:outline focus-visible:outline-main-purple-hover  motion-safe:transition-colors motion-safe:ease-in-out"
        on:click={() => handleSelection(id)}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
            fill="currentColor"
          />
        </svg>

        <Heading element="span" style="M"
          ><span class="sr-only"> Open </span>{name}</Heading
        >
      </button>
    {/each}
  </div>
  <button
    class="w-full flex gap-3 lg:gap-4 items-center min-h-button-l pl-6 lg:pl-8 rounded-tr-full rounded-br-full  text-main-purple-normal  outline-2 focus-visible:outline focus-visible:outline-main-purple-hover hocus:text-main-purple-normal hocus:bg-main-purple-normal/10 dark:hocus:bg-white  motion-safe:transition-colors motion-safe:ease-in-out"
    on:click={() => handleCreateNew()}
  >
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M0.846133 0.846133C0.304363 1.3879 0 2.12271 0 2.88889V13.1111C0 13.8773 0.304363 14.6121 0.846133 15.1538C1.3879 15.6957 2.12271 16 2.88889 16H13.1111C13.8773 16 14.6121 15.6957 15.1538 15.1538C15.6957 14.6121 16 13.8773 16 13.1111V2.88889C16 2.12271 15.6957 1.3879 15.1538 0.846133C14.6121 0.304363 13.8773 0 13.1111 0H2.88889C2.12271 0 1.3879 0.304363 0.846133 0.846133ZM1.33333 13.1111V8.44448H9.77781V14.6667H2.88889C2.03022 14.6667 1.33333 13.9698 1.33333 13.1111ZM9.77781 7.11111V1.33333H2.88889C2.47633 1.33333 2.08067 1.49723 1.78895 1.78895C1.49723 2.08067 1.33333 2.47633 1.33333 2.88889V7.11111H9.77781ZM11.1111 5.77778H14.6667V10.2222H11.1111V5.77778ZM14.6667 11.5555H11.1111V14.6667H13.1111C13.5236 14.6667 13.9194 14.5028 14.2111 14.2111C14.5028 13.9194 14.6667 13.5236 14.6667 13.1111V11.5555ZM14.6667 2.88889V4.44445H11.1111V1.33333H13.1111C13.5236 1.33333 13.9194 1.49723 14.2111 1.78895C14.5028 2.08067 14.6667 2.47633 14.6667 2.88889Z"
        fill="currentColor"
      />
    </svg>

    <Heading element="span" style="M"
      ><span aria-hidden="true">+ </span>Create New Board</Heading
    >
  </button>
</div>
