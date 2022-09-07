<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Heading from "./Heading.svelte";
</script>

<Meta
  title="Typography/Heading"
  component={Heading}
  argTypes={{
    element: { control: "select", options: ["h1", "h2", "h3", "span", "p"] },
    style: { control: "select", options: ["XL", "L", "M", "S"] },
    classes: { control: "text" },
  }}
/>

<Template let:args>
  <Heading {...args}>Heading</Heading>
</Template>

<Story name="Heading XL (Default)" args={{}} />

<Story name="Heading XL (Explicit}" args={{ element: "h1", style: "XL" }} />

<Story name="Heading L" args={{ element: "h2", style: "L" }} />

<Story name="Heading M" args={{ element: "h3", style: "M" }} />

<Story name="Heading S" args={{ element: "span", style: "S" }} />

<Story
  name="Heading (extra classes)"
  args={{ element: "span", style: "S", classes: "text-gray-medium" }}
/>
