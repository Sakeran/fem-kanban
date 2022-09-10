<script lang="ts">
  import { expect } from "@storybook/jest";
  import { userEvent, within, waitFor } from "@storybook/testing-library";

  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import SubtaskCheckbox from "./SubtaskCheckbox.svelte";
</script>

<Meta
  title="Interactive/SubtaskCheckbox"
  component={SubtaskCheckbox}
  argTypes={{
    content: { control: "text" },
    completed: { control: "boolean" },

    toggle: { action: "toggle" },
  }}
/>

<Template let:args>
  <div style="max-width:21.875rem;">
    <SubtaskCheckbox {...args} on:toggle={args.toggle} />
  </div>
</Template>

<Story
  name="Not Completed"
  args={{
    content: "Research competitor pricing and business models",
    completed: false,
  }}
/>

<Story
  name="Completed"
  args={{
    content: "Research competitor pricing and business models",
    completed: true,
  }}
/>

<Story
  name="Toggle Complete"
  args={{
    content: "Research competitor pricing and business models",
    completed: false,
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const subtask = canvas.getByLabelText(
      "Research competitor pricing and business models"
    );

    await userEvent.click(subtask);
    await waitFor(() => expect(args.toggle).toHaveBeenCalled());

    const { detail: newToggleStatus } = args.toggle.mock.lastCall[0];

    expect(newToggleStatus).toBe(true);
    expect(subtask).toHaveProperty('checked', true);
  }}
/>

<Story
  name="Toggle Incomplete"
  args={{
    content: "Research competitor pricing and business models",
    completed: true,
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const subtask = canvas.getByLabelText(
      "Research competitor pricing and business models"
    );

    await userEvent.click(subtask);
    await waitFor(() => expect(args.toggle).toHaveBeenCalled());

    const { detail: newToggleStatus } = args.toggle.mock.lastCall[0];

    expect(newToggleStatus).toBe(false);
    expect(subtask).toHaveProperty('checked', false);
  }}
/>
