<script lang="ts">
  import { expect } from "@storybook/jest";
  import { userEvent, waitFor, within } from "@storybook/testing-library";
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import TextInput from "./TextInput.svelte";
</script>

<Meta
  title="Interactive/TextInput"
  component={TextInput}
  argTypes={{
    placeholder: { control: "text" },
    label: { control: "text" },
    value: { control: "text" },
    required: { control: "boolean" },
  }}
  parameters={{ actions: { handles: ["input", "change", "blur"] } }}
/>

<Template let:args>
  <div style="max-width: 26rem;"><TextInput {...args} /></div>
</Template>

<Story
  name="Idle"
  args={{ label: "Text Field", placeholder: "Enter task name" }}
/>

<Story
  name="Filled"
  args={{
    label: "Text Field",
    placeholder: "Enter task name",
    value: "Building a slideshow",
  }}
/>

<Story
  name="Enter Text"
  args={{ label: "Text Field", placeholder: "Enter task name", required: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Text Field");

    await userEvent.type(input, "Building a slideshow");
    expect(input).toHaveValue( "Building a slideshow")

    const errors = canvas.getByTestId("ti-error");
    await waitFor(() => {
      expect(errors).not.toBeVisible();
    });
  }}
/>

<Story
  name="Empty Error"
  args={{ label: "Text Field", placeholder: "Enter task name", required: true }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByLabelText("Text Field");

    await userEvent.click(input);
    await userEvent.tab();

    const errors = canvas.getByTestId("ti-error");

    await waitFor(() => {
      expect(errors).toBeVisible();
    });
  }}
/>