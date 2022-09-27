<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import ViewTaskCard from "./ViewTaskCard.svelte";
  import { createMockBoards } from "../../../helpers/mocks";

  const board = createMockBoards()[0];
  const task = board.columns[0].tasks[0];
</script>

<Meta
  title="UI/ViewTaskCard"
  component={ViewTaskCard}
  argTypes={{
    toggleSubtask: { action: "toggleSubtask" },
    updateStatus: { action: "updateStatus" },
    editTask: { action: "editTask" },
    deleteTask: { action: "deleteTask" },
  }}
/>

<Template let:args>
  <div
    style="max-width: 30rem; padding: 1rem; background-color: hsl(0 0% 0% / .4);"
  >
    <ViewTaskCard
      {...args}
      on:toggleSubtask={args.toggleSubtask}
      on:updateStatus={args.updateStatus}
      on:editTask={args.editTask}
      on:deleteTask={args.deleteTask}
    />
  </div>
</Template>

<Story
  name="Default"
  args={{
    task,
    board,
  }}
/>

<Story
  name="Update Task"
  args={{
    task,
    board,
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const updateStatusFn = args.updateStatus;
    const toggleSubtaskFn = args.toggleSubtask;

    // Get Inputs
    const toggleButton = canvas.getByText("Options Menu");
    const subtaskToggles = canvas.getAllByTestId("subtask-cb");
    const statusSelect = canvas.getByLabelText("Current Status");

    // Toggle Tasks
    expect(subtaskToggles).toHaveLength(3);

    await userEvent.click(subtaskToggles[0]);
    expect(toggleSubtaskFn).toHaveBeenCalledTimes(1);

    let { detail } = toggleSubtaskFn.mock.lastCall[0];
    expect(detail.subtaskTitle).toBe(task.subtasks[0].title);
    expect(detail.task).toBe(task);

    await userEvent.click(subtaskToggles[0]);
    expect(toggleSubtaskFn).toHaveBeenCalledTimes(2);

    detail = toggleSubtaskFn.mock.lastCall[0].detail;
    expect(detail.subtaskTitle).toBe(task.subtasks[0].title);
    expect(detail.task).toBe(task);

    // Update Status
    await userEvent.selectOptions(statusSelect, "Doing");

    detail = updateStatusFn.mock.lastCall[0].detail;
    expect(detail.status).toBe("Doing");

    // Toggle Menu
    await userEvent.click(toggleButton);

    // Confirm that menu exists
    canvas.getByRole("menu");
  }}
/>
