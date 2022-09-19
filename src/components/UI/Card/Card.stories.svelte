<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";

  import Card, { cardPaddingStyles } from "./Card.svelte";
  import Heading from "../../Typography/Heading/Heading.svelte";
  import Text from "../../Typography/Text/Text.svelte";
</script>

<Meta
  title="UI/Card"
  component={Card}
  argTypes={{
    element: { control: "radio", options: ["div", "section"] },
    borderRadius: { control: "radio", options: [6, 8] },
    paddingStyle: { control: "radio", options: Object.keys(cardPaddingStyles) },
    minHeight: { control: "text" },
    shadow: { control: "boolean" },

    containerWidthPx: { control: "number", defaultValue: 320 },
  }}
/>

<Template let:args>
  <div style={`max-width: ${args.containerWidthPx}px;`}>
    <Card {...args}>
      <div
        style="display: flex; flex-direction:column; gap: 1rem; color: gray;"
      >
        <Heading>Heading</Heading>
        <Text
          >Lorem ipsum dolor sit, amet consectetur adipisicing elit. Adipisci
          officia voluptate recusandae omnis earum itaque porro facere ab, a,
          neque, provident eum ipsum. Eos eius libero, quos animi quas facilis?</Text
        >
      </div>
    </Card>
  </div>
</Template>

<Story
  name="Default"
  args={{
    element: "div",
    borderRadius: 6,
    shadow: true,
    minHeight: "auto",
  }}
/>
