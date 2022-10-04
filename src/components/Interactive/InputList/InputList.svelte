<script context="module" lang="ts">
  type InitAction = { type: "init"; values: string[] };
  type AddAction = { type: "add" };
  type DeleteAction = { type: "delete"; index: number };
  type RenameAction = { type: "rename"; index: number; value: string };

  export type InputListAction =
    | InitAction
    | AddAction
    | DeleteAction
    | RenameAction;
</script>

<script lang="ts">
  import Text from "../../Typography/Text/Text.svelte";
  import { createEventDispatcher, tick } from "svelte";
  import Button from "../Button/Button.svelte";
  import TextInput from "../TextInput/TextInput.svelte";

  export let classes = "";

  export let label: string;
  export let buttonText: string = "Add New Subtask";
  export let itemName: string = "subtask";
  export let items: string[] = [];

  // Keep track of the actions performed on this input.
  // This is necessary to determine which columns are renamed, deleted, etc
  const actions: InputListAction[] = [{ type: "init", values: [...items] }];

  const dispatch = createEventDispatcher();
  function dispatchActionUpdate() {
    dispatch("actionUpdate", actions);
  }

  let inputContainer: HTMLDivElement;
  function handleAddItem() {
    items.push("");
    items = items;

    actions.push({ type: "add" });
    dispatchActionUpdate();

    tick().then(() => {
      const newInput = inputContainer.querySelector("input:last-of-type");
      if (newInput) (newInput as HTMLInputElement).focus();
    });
  }

  function handleDeletion(itemIdx: number) {
    // Don't delete non-existent entries
    if (itemIdx >= items.length) return;

    items.splice(itemIdx, 1);
    items = items;

    actions.push({ type: "delete", index: itemIdx });
    dispatchActionUpdate();
  }

  function handleRenameItem(e, itemIdx: number) {
    // To avoid cluttering the list, if the last action was a rename on the same
    // index, just update the value.
    const last = actions[actions.length - 1];
    if (last.type == "rename" && last.index == itemIdx) {
      last.value = e.target.value;

      dispatchActionUpdate();
      return;
    }

    actions.push({ type: "rename", index: itemIdx, value: e.target.value });
    dispatchActionUpdate();
  }
</script>

<div class={classes || null}>
  <h3 class="text-12p font-bold text-gray-medium dark:text-white">{label}</h3>
  <div class="mt-2 flex flex-col gap-3">
    {#if items.length === 0}
      <div class="text-gray-medium text-center">
        <Text>You haven't added any {itemName}s yet.</Text>
      </div>
    {/if}
    {#each items as item, idx}
      <div class="flex gap-1" bind:this={inputContainer}>
        <TextInput
          label={item || "blank " + itemName}
          placeholder="e.g. Make coffee"
          classes="basis-full"
          required
          visuallyHideLabel={true}
          bind:value={item}
          on:input={(e) => handleRenameItem(e, idx)}
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
