<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Text from "./Text.svelte";
</script>

<Meta
  title="Typography/Text"
  component={Text}
  argTypes={{
    element: { control: "select", options: ["p", "label", "span"] },
    style: { control: "select", options: ["L", "M"] },
    classes: { control: "text" },
  }}
/>

<Template let:args>
  <div style="max-width: 40ch;">
    <Text {...args}>
      Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa, error
      facere? Minus iste odit repudiandae minima reiciendis, earum a inventore
      nihil autem sed quidem molestias dolorem ad aliquid, delectus nisi.
    </Text>
  </div>
</Template>

<Story name="Text L (paragraph, default)" args={{}} />

<Story name="Text L (paragraph, explicit)" args={{ element: "p", style: "L" }} />

<Story name="Text M" args={{ element: "span", style: "M" }} />

<Story
  name="Text M (Extra Classes)"
  args={{ element: "span", style: "M", classes: "text-gray-medium" }}
/>
