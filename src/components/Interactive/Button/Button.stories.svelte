<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Button from "./Button.svelte";
</script>

<Meta
  title="Interactive/Button"
  component={Button}
  argTypes={{
    content: { control: "text", defaultValue: "Button" },
    element: { control: "select", options: ["button", "a"] },
    style: {
      control: "select",
      options: ["PrimaryL", "PrimaryS", "Secondary", "Destructive"],
    },
    disabled: {control: "boolean"},
    classes: { control: "text" },
  }}
  parameters={{ actions: { handles: ["click"] } }}
/>

<Template let:args>
  <Button {...args}>{args.content}</Button>
</Template>

<Story name="PrimaryL (Default)" args={{ content: "Button Primary (L)" }} />

<Story
  name="PrimaryL (Explicit)"
  args={{ content: "Button Primary (L)", style: "PrimaryL" }}
/>

<Story
  name="PrimaryL (Link)"
  args={{ content: "Button Primary (L)", element: "a" }}
/>

<Story
  name="PrimaryS"
  args={{ content: "Button Primary (S)", style: "PrimaryS" }}
/>

<Story
  name="Secondary"
  args={{ content: "Button Secondary", style: "Secondary" }}
/>

<Story
  name="Destructive"
  args={{ content: "Button Destructive", style: "Destructive" }}
/>

<Story
  name="PrimaryNarrow"
  args={{ content: "+ Add New Task", style: "PrimaryNarrow" }}
/>

<Story
  name="Primary L (Extra Classes)"
  args={{
    content: "Button Primary Block",
    style: "PrimaryL",
    classes: "w-full",
  }}
/>

<Story
  name="Disabled"
  args={{ content: "Button (disabled)", style: "PrimaryL", disabled: true }}
/>
