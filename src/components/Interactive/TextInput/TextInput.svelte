<script lang="ts">
  export let label: string;
  export let placeholder: string = "";
  export let value: string = "";
  export let required: boolean = false;
  export let visuallyHideLabel: boolean = false;
  export let classes: string = "";

  const inputId = `ti-input-${Math.random().toString().slice(3, 13)}`;
  const inputIdErrors = inputId + "-errors";

  let input: HTMLInputElement;
  let hasErrors = false;
  function checkInput() {
    hasErrors = required && input.value === "";
  }
</script>

<div class={"flex flex-col gap-2 " + (classes || "")}>
  <label
    for={inputId}
    class:sr-only={visuallyHideLabel}
    class="font-bold text-12p text-gray-medium dark:text-white">{label}</label
  >

  <div
    class="py-2 px-4 rounded-xs bg-white dark:bg-gray-dark border border-gray-medium/25 flex gap-2 hover:border-gray-medium/100 focus-within:border-gray-medium/100 [&[data-errors]]:border-red-normal motion-safe:transition-colors motion-safe:ease-in-out"
    data-errors={hasErrors || null}
  >
    <input
      type="text"
      id={inputId}
      bind:this={input}
      aria-describedby={hasErrors ? inputIdErrors : null}
      on:input={checkInput}
      on:input
      on:blur={checkInput}
      on:change={checkInput}
      class="text-13p font-medium leading-23/13 text-black placeholder:text-black/25 dark:text-white dark:placeholder:text-white/25 basis-full outline-none bg-transparent"
      bind:value
      {required}
      {placeholder}
    />
    <span
      id={inputIdErrors}
      data-testid="ti-error"
      style:visibility={hasErrors ? "visible" : "collapse"}
      class="text-red-normal font-medium text-13p leading-23/13 text-end basis-auto shrink-0"
      >Can't be empty</span
    >
  </div>
</div>
