<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Card from "../Card/Card.svelte";
  import Button from "../../Interactive/Button/Button.svelte";
  import InputList from "../../Interactive/InputList/InputList.svelte";
  import TextInput from "../../Interactive/TextInput/TextInput.svelte";
  import Heading from "../../Typography/Heading/Heading.svelte";

  export let title: string = "Add New Board";
  export let submitButtonText: string = "Create New Board";
  export let name = "";
  export let columns: string[] = [];

  const dispatch = createEventDispatcher();

  function handleCreateBoard() {
    if (!formIsValid()) return;
    dispatch("submitBoard", { name, columns });
  }

  function formIsValid() {
    // Board name must exist
    if (name.length === 0) return false;

    // Require at least one column
    if (columns.length < 1) return false;

    const seenColumns = new Set();
    for (const col of columns) {
      // No empty column names
      if (col.length === 0) return false;

      // No duplicate column names allowed
      if (seenColumns.has(col)) return false;
      seenColumns.add(col);
    }

    return true;
  }
</script>

<Card borderRadius={6} paddingStyle="Modal">
  <Heading element="h2" classes="text-black dark:text-white">{title}</Heading>
  <TextInput
    bind:value={name}
    label="Board Name"
    required={true}
    classes="my-6"
  />
  <InputList
    label="Board Columns"
    buttonText="Add New Column"
    itemName="column"
    bind:items={columns}
  />
  <Button style="PrimaryS" classes="w-full mt-6" on:click={handleCreateBoard}
    >{submitButtonText}</Button
  >
</Card>
