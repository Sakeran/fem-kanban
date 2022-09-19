<script lang="ts">
  export let label: string;
  export let options: string[];
  export let value: string = "";
  export let classes: string = "";

  const selectId = `select-id-${Math.random().toString().slice(3, 13)}`;
  if (!value) value = options[0];
</script>

<div class={"flex flex-col gap-2" + classes ? " " + classes : ""}>
  <label
    class="font-bold text-12p text-gray-medium dark:text-white"
    for={selectId}>{label}</label
  >
  <div
    class="mt-2 relative rounded-xs bg-white dark:bg-gray-dark border border-gray-medium/25 hover:border-main-purple-normal focus-within:border-main-purple-normal motion-safe:transition-colors motion-safe:ease-in-out"
  >
    <select
      class="py-2 px-4 rounded-xxs appearance-none bg-transparent w-full cursor-pointer font-medium text-13p leading-23/13 text-black dark:text-white focus-visible:outline outline-1 focus-visible:outline-main-purple-normal focus-visible:outline-offset-4 "
      id={selectId}
      on:change
      bind:value
    >
      {#each options as option}
        <option style:color="initial" selected={value == option}
          >{option}</option
        >
      {/each}
    </select>
    <div
      class="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-main-purple-normal"
    >
      <svg
        width="0.687rem"
        height="0.5rem"
        viewBox="0 0 11 8"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.79834 1.54858L5.49682 6.24707L10.1953 1.54858"
          stroke="currentColor"
          stroke-width="2"
        />
      </svg>
    </div>
  </div>
</div>

<style lang="postcss">
</style>
