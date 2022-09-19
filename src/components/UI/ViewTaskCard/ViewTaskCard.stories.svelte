<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import ViewTaskCard from "./ViewTaskCard.svelte";
</script>

<Meta
  title="UI/ViewTaskCard"
  component={ViewTaskCard}
  argTypes={{
    updateTask: { action: "updateTask" },
    toggleTaskMenu: { action: "toggleTaskMenu" },
  }}
/>

<Template let:args>
  <div
    style="max-width: 30rem; padding: 1rem; background-color: hsl(0 0% 0% / .4);"
  >
    <ViewTaskCard
      {...args}
      on:updateTask={args.updateTask}
      on:toggleTaskMenu={args.toggleTaskMenu}
    />
  </div>
</Template>

<Story
  name="Default"
  args={{
    title:
      "Research pricing points of various competitors and trial different business models",
    description:
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",

    subtasks: [
      {
        title: "Research competitor pricing and business models",
        isComplete: false,
      },
      {
        title: "Outline a business model that works for our solution",
        isComplete: false,
      },
      { title: "Surveying and testing", isComplete: false },
    ],

    boardColumns: ["Todo", "Doing", "Done"],
    status: "Todo",
  }}
/>

<Story
  name="Update Task"
  args={{
    title:
      "Research pricing points of various competitors and trial different business models",
    description:
      "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",

    subtasks: [
      {
        title: "Research competitor pricing and business models",
        isComplete: false,
      },
      {
        title: "Outline a business model that works for our solution",
        isComplete: false,
      },
      { title: "Surveying and testing", isComplete: false },
    ],

    boardColumns: ["Todo", "Doing", "Done"],
    status: "Todo",
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const updateTaskFn = args.updateTask;
    const toggleTaskFn = args.toggleTaskMenu;

    // Get Inputs
    const toggleButton = canvas.getByText("Options Menu");
    const subtaskToggles = canvas.getAllByTestId("subtask-cb");
    const statusSelect = canvas.getByLabelText("Current Status");

    // Toggle Tasks
    expect(subtaskToggles).toHaveLength(3);

    await userEvent.click(subtaskToggles[0]);
    expect(updateTaskFn).toHaveBeenCalledTimes(1);

    let { detail } = updateTaskFn.mock.lastCall[0];
    expect(detail.subtasks[0].isComplete).toBe(true);

    await userEvent.click(subtaskToggles[0]);
    expect(updateTaskFn).toHaveBeenCalledTimes(2);

    detail = updateTaskFn.mock.lastCall[0].detail;
    expect(detail.subtasks[0].isComplete).toBe(false);

    // Update Status
    await userEvent.selectOptions(statusSelect, "Doing");

    detail = updateTaskFn.mock.lastCall[0].detail;
    expect(detail.status).toBe("Doing");

    // Toggle Menu
    await userEvent.click(toggleButton);
    expect(toggleTaskFn).toBeCalledTimes(1);
  }}
/>
