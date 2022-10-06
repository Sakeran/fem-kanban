<script lang="ts">
  import { createEventDispatcher } from "svelte";

  import Card from "../Card/Card.svelte";
  import Heading from "../../Typography/Heading/Heading.svelte";
  import Text from "../../Typography/Text/Text.svelte";
  import Button from "../../Interactive/Button/Button.svelte";

  export let title: string;
  export let message: string;

  const dispatch = createEventDispatcher();

  function handleCancel() {
    dispatch("cancel");
  }

  function handleConfirmDelete() {
    dispatch("confirmDelete");
  }
</script>

<Card borderRadius={6} paddingStyle="Modal">
  <Heading id="delete-item-card-header" element="h2" style="L" classes="text-red-normal">{title}</Heading>
  <Text style="L" classes="mt-6 text-gray-medium">{message}</Text>
  <div class="mt-6 flex flex-col sm:flex-row gap-4">
    <Button
      style="Destructive"
      classes="basis-full"
      on:click={handleConfirmDelete}>Delete</Button
    >
    <Button style="Secondary" classes="basis-full" on:click={handleCancel}
      >Cancel</Button
    >
  </div>
</Card>
