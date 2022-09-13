<script lang="ts">
  import { expect } from "@storybook/jest";
  import { userEvent, within } from "@storybook/testing-library";
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import TextArea from "./TextArea.svelte";
</script>

<Meta
  title="Interactive/TextArea"
  component={TextArea}
  argTypes={{
    placeholder: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
  }}
  parameters={{ actions: { handles: ["input", "change", "blur"] } }}
/>

<Template let:args>
  <div style="max-width: 26rem;"><TextArea {...args} /></div>
</Template>

<Story
  name="Idle"
  args={{
    label: "Text Area",
    placeholder:
      "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.",
  }}
/>

<Story
  name="Filled"
  args={{
    label: "Text Area",
    placeholder:
      "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.",
    value:
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
  }}
/>

<Story
  name="Enter Text"
  args={{
    label: "Text Area",
    placeholder:
      "e.g. It’s always good to take a break. This 15 minute break will recharge the batteries a little.",
    required: true,
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textArea = canvas.getByLabelText("Text Area");

    await userEvent.type(
      textArea,
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition."
    );
    expect(textArea).toHaveValue(
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition."
    );
  }}
/>
