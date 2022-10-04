<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import TodoCard from "./TodoCard.svelte";
</script>

<Meta
  title="UI/TodoCard"
  component={TodoCard}
  argTypes={{
    title: { control: "text" },
    subtaskTotal: { control: "number" },
    subtasksCompleted: { control: "number" },
    click: { action: "click" },

    containerWidthPx: { control: "number", defaultValue: 280 },
  }}
/>

<Template let:args>
  <div style={`max-width: ${args.containerWidthPx}px;`}>
    <TodoCard {...args} on:click={args.click} />
  </div>
</Template>

<Story
  name="Default"
  args={{
    title: "Build UI for onboarding flow",
    subtaskTotal: 3,
    subtasksCompleted: 0,
  }}
/>

<Story
  name="No Subtasks"
  args={{
    title: "Build UI for onboarding flow",
    subtaskTotal: 0,
    subtasksCompleted: 0,
  }}
/>
