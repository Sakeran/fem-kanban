<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";

  import Card from "../Card/Card.svelte";
  import Heading from "../../Typography/Heading/Heading.svelte";
  import Select from "../../Interactive/Select/Select.svelte";
  import MenuToggle from "../../Interactive/MenuToggle/MenuToggle.svelte";
  import Text from "../../Typography/Text/Text.svelte";
  import SubtaskCheckbox from "../../Interactive/SubtaskCheckbox/SubtaskCheckbox.svelte";

  export let boardColumns: string[];

  export let title;
  export let description = "";
  export let subtasks: { title: string; isComplete: boolean }[];
  export let status: string;

  let subtasksTotal: number = subtasks.length;
  let subtasksFinished: number;
  $: {
    subtasksFinished = subtasks.reduce(
      (acc, el) => (el.isComplete ? acc + 1 : acc),
      0
    );
  }

  const dispatch = createEventDispatcher();

  function handleUpdateSubtask() {
    dispatch("updateTask", { subtasks, status });
  }

  function handleMenuToggle() {
    dispatch("toggleTaskMenu");
  }
</script>

<Card borderRadius={6} paddingStyle="Modal">
  <div class="flex items-center">
    <Heading style="L" classes="text-black dark:text-white grow"
      >{title}</Heading
    >
    <div class="relative left-1">
      <MenuToggle textAlternative="Options Menu" on:click={handleMenuToggle} />
    </div>
  </div>
  <Text style="L" classes="mt-6 text-gray-medium">{description}</Text>
  <fieldset class="mt-6">
    <legend class="sr-only"
      >Subtasks ({subtasksFinished} of {subtasksTotal})</legend
    >
    <div class="font-bold text-12p text-gray-medium dark:text-white" aria-hidden="true">
      Subtasks ({subtasksFinished} of {subtasksTotal})
    </div>

    <div class="mt-4 flex flex-col gap-2">
      {#each subtasks as { title, isComplete }}
        <SubtaskCheckbox
          on:toggle={handleUpdateSubtask}
          content={title}
          bind:completed={isComplete}
        />
      {/each}
    </div>
  </fieldset>
  <Select
    options={boardColumns}
    label="Current Status"
    bind:value={status}
    on:change={() => tick().then(() => handleUpdateSubtask())}
    classes="mt-6"
  />
</Card>
