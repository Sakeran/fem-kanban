<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Card from "../Card/Card.svelte";
  import Button from "../../Interactive/Button/Button.svelte";
  import InputList from "../../Interactive/InputList/InputList.svelte";
  import TextInput from "../../Interactive/TextInput/TextInput.svelte";
  import TextArea from "../../Interactive/TextArea/TextArea.svelte";
  import Heading from "../../Typography/Heading/Heading.svelte";
  import Select from "../../Interactive/Select/Select.svelte";

  export let cardTitle: string = "Add New Task";
  export let submitButtonText: string = "Create Task";
  export let boardColumns: string[];

  export let title = "";
  export let description = "";
  export let subtasks: string[] = [];
  export let status: string = undefined;

  if (!status) status = boardColumns[0];

  const dispatch = createEventDispatcher();

  function handleSubmitTask(e) {
    e.preventDefault();
    if (!formIsValid()) return;
    dispatch("submitTask", { title, description, subtasks, status });
  }

  function formIsValid() {
    // Task title must not be blank
    if (title.length === 0) return false;

    const seenSubtasks = new Set();
    for (const subtask of subtasks) {
      // No empty subtask names
      if (subtask.length === 0) return false;

      // No duplicate subtask names allowed
      if (seenSubtasks.has(subtask)) return false;
      seenSubtasks.add(subtask);
    }

    // Status must be one of the provided values
    if (!boardColumns.includes(status)) return false;

    return true;
  }
</script>

<Card borderRadius={6} paddingStyle="Modal">
  <form on:submit={handleSubmitTask}>
    <Heading id="edit-task-card-header" element="h2" classes="text-black dark:text-white"
      >{cardTitle}</Heading
    >
    <TextInput
      bind:value={title}
      label="Title"
      required={true}
      classes="mt-6"
    />
    <TextArea label="Description" bind:value={description} classes="mt-6" />
    <InputList
      label="Subtasks"
      buttonText="Add New Subtask"
      itemName="subtask"
      bind:items={subtasks}
      classes="mt-6"
    />
    <Select
      options={boardColumns}
      label="Status"
      bind:value={status}
      classes="mt-6"
    />
    <Button style="PrimaryS" classes="w-full mt-6" on:click={handleSubmitTask}
      >{submitButtonText}</Button
    >
  </form>
</Card>
