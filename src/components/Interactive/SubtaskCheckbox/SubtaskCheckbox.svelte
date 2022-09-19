<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let content: string;
  export let completed: boolean = false;

  const dispatch = createEventDispatcher();
  function toggle(e) {
    e.preventDefault();

    completed = !completed;
    dispatch("toggle", completed);
  }
</script>

<label
  class="p-3 rounded-xs bg-gray-light dark:bg-gray-very-dark hocus:bg-main-purple-normal/25 focus-within:bg-main-purple-normal/25 grid gap-4 cursor-pointer motion-safe:transition-colors motion-safe:ease-in-out"
>
  <input
    on:change={toggle}
    data-testid="subtask-cb"
    type="checkbox"
    checked={completed}
    class:peer={true}
    class="row-span-1 row-start-1 col-start-1 self-center focus-visible:outline focus-visible:outline-main-purple-normal focus-visible:outline-1 focus-visible:outline-offset-2 motion-safe:transition-colors motion-safe:ease-in-out"
  />
  <div
    aria-hidden="true"
    class="hidden row-span-1 row-start-1 col-start-1 self-center box-content w-4 aspect-square peer-checked:grid place-items-center border border-transparent pointer-events-none"
  >
    <svg
      aria-hidden="true"
      width="0.625rem"
      height="0.5rem"
      viewBox="0 0 10 8"
      fill="none"
      class="mt-[0.0625rem]"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.27588 3.06593L4.03234 5.82239L9.03234 0.822388"
        stroke="white"
        stroke-width="2"
      />
    </svg>
  </div>
  <span
    class="row-span-1 row-start-1 font-bold text-black dark:text-white text-12p peer-checked:text-black/50 dark:peer-checked:text-white/50 peer-checked:line-through peer-checked:decoration-black/50 dark:peer-checked:decoration-white/50  select-none"
    >{content}</span
  >
</label>

<style lang="postcss">
  label {
    grid-template-columns: max-content 1fr;
  }

  input[type="checkbox"] {
    appearance: none;
    box-sizing: content-box;
    cursor: pointer;

    width: 1rem;
    aspect-ratio: 1;

    border-radius: theme("borderRadius.xxs");
    background-color: theme("colors.white");
    border: 1px solid theme("colors.gray.medium" / 25%);
  }

  :global(.dark) input[type="checkbox"] {
    background-color: theme("colors.gray.dark");
  }

  input[type="checkbox"]:checked {
    background-color: theme("colors.main-purple.normal");
    border-color: transparent;
  }
</style>
