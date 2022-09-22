<script lang="ts">
  export let label: string;
  export let placeholder: string = "";
  export let value: string = "";
  export let classes = "";

  const textAreaId = `ti-input-${Math.random().toString().slice(3, 13)}`;
</script>

<div class={"flex flex-col gap-2" + (classes ? " " + classes : "")}>
  <label
    for={textAreaId}
    class="font-bold text-12p text-gray-medium dark:text-white">{label}</label
  >

  <div
    class="py-2 px-4 rounded-xs bg-white dark:bg-gray-dark border border-gray-medium/25 hover:border-gray-medium/100 focus-within:border-gray-medium/100 motion-safe:transition-colors motion-safe:ease-in-out"
  >
    <textarea
      type="text"
      id={textAreaId}
      on:input
      on:blur
      on:change
      rows="4"
      class="min-h-[6rem] w-full resize-none text-13p font-medium leading-23/13 text-black placeholder:text-black/25 dark:text-white dark:placeholder:text-white/25 basis-full outline-none bg-transparent"
      bind:value
      {placeholder}
    />
  </div>
</div>
