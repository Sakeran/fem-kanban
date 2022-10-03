<script lang="ts">
  import { tick } from "svelte";
  import Button from "../Button/Button.svelte";
  import TextInput from "../TextInput/TextInput.svelte";

  export let classes = "";

  export let label: string;
  export let buttonText: string = "Add New Subtask";
  export let itemName: string = "subtask";
  export let items: string[] = [];

  if (items.length === 0) items.push("");

  let inputContainer: HTMLDivElement;
  function handleAddItem() {
    items.push("");
    items = items;

    tick().then(() => {
      const newInput = inputContainer.querySelector("input:last-of-type");
      if (newInput) (newInput as HTMLInputElement).focus();
    });
  }

  function handleDeletion(itemIdx: number) {
    // Don't delete non-existent entries
    if (itemIdx >= items.length) return;
    // Always show at least one item box
    if (items.length === 1) return;

    items.splice(itemIdx, 1);
    items = items;
  }
</script>

<div class={classes || null}>
  <h3 class="text-12p font-bold text-gray-medium dark:text-white">{label}</h3>
  <div class="mt-2 flex flex-col gap-3">
    {#each items as item, idx}
      <div class="flex gap-1" bind:this={inputContainer}>
        <TextInput
          label={item || "blank " + itemName}
          placeholder="e.g. Make coffee"
          classes="basis-full"
          required
          visuallyHideLabel={true}
          bind:value={item}
        />
        <button
          type="button"
          class="text-gray-medium hocus:text-red-normal focus-visible:outline focus-visible:outline-red-normal aspect-square p-3"
          on:click={() => handleDeletion(idx)}
        >
          <svg
            width="15"
            height="15"
            viewBox="0 0 15 15"
            aria-hidden="true"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="12.7275"
              width="3"
              height="18"
              transform="rotate(45 12.7275 0)"
              fill="currentColor"
            />
            <rect
              y="2.12132"
              width="3"
              height="18"
              transform="rotate(-45 0 2.12132)"
              fill="currentColor"
            />
          </svg>

          <span class="sr-only"
            >Delete {item ? itemName + " " + item : "blank " + itemName}</span
          >
        </button>
      </div>
    {/each}
  </div>
  <Button
    style="Secondary"
    type="button"
    classes="block w-full mt-3"
    on:click={handleAddItem}
    ><span><span aria-hidden="true">+ </span>{buttonText}</span></Button
  >
</div>

<style lang="postcss">
</style>
