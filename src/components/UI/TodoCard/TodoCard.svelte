<script lang="ts">
  import Text from "../../Typography/Text/Text.svelte";
  import Heading from "../../Typography/Heading/Heading.svelte";
  import Card from "../Card/Card.svelte";

  export let title: string;
  export let subtaskTotal: number;
  export let subtasksCompleted: number;
</script>

<Card
  borderRadius={8}
  padding={[23, 16]}
  shadow={true}
  classes="relative text-black dark:text-white hover:text-main-purple-normal focus-within:text-main-purple-normal dark:hover:text-main-purple-normal dark:focus-within:text-main-purple-normal"
>
  <Heading element={"h3"} style="M">{title}</Heading>
  <Text style="M" classes="mt-2 text-gray-medium"
    >{subtasksCompleted} of {subtaskTotal} complete</Text
  >
  <button
    on:click
    class="block w-full absolute inset-0 rounded-lg outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover motion-safe:transition-colors motion-safe:ease-in-out"
    ><span class="sr-only">View Task</span></button
  >
</Card>
