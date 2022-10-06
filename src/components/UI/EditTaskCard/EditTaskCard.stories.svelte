<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import EditTaskCard from "./EditTaskCard.svelte";
</script>

<Meta
  title="UI/EditTaskCard"
  component={EditTaskCard}
  argTypes={{
    submitTask: { action: "submitTask" },
  }}
/>

<Template let:args>
  <div
    style="max-width: 30rem; padding: 1rem; background-color: hsl(0 0% 0% / .4);"
  >
    <EditTaskCard {...args} on:submitTask={args.submitTask} />
  </div>
</Template>

<Story
  name="Default"
  args={{
    cardTitle: "Add New Task",
    submitButtonText: "Create Task",

    boardColumns: ["Todo", "Doing", "Done"],
    status: "Todo",
  }}
/>

<Story
  name="Edit Existing Card"
  args={{
    cardTitle: "Edit Task",
    submitButtonText: "Save Changes",

    title: "Existing Task",
    description: "Some existing task description",
    subtasks: ["Task 1", "Task 2", "Task 3"],

    boardColumns: ["Todo", "Doing", "Done"],
    status: "Todo",
  }}
/>

<Story
  name="Create Task"
  args={{
    cardTitle: "Add New Task",
    submitButtonText: "Create Task",

    boardColumns: ["Todo", "Doing", "Done"],
    status: "Todo",
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const createTaskFn = args.submitTask;

    // Get Inputs
    const titleInput = canvas.getByLabelText("Title");
    const descInput = canvas.getByLabelText("Description");
    const addNewSubtaskButton = canvas.getByText("Add New Subtask");
    const statusSelect = canvas.getByLabelText("Status");
    const createTaskButton = canvas.getByText("Create Task");

    // Should not submit without a title
    await userEvent.click(createTaskButton);
    expect(createTaskFn).not.toHaveBeenCalled();

    await userEvent.type(titleInput, "Test Task");

    // Input description (should be optional)
    await userEvent.type(descInput, "Some task description");

    // Input first subtask name
    await userEvent.click(addNewSubtaskButton);
    const firstSubtaskInput = canvas.getByLabelText("blank subtask");
    await userEvent.type(firstSubtaskInput, "Subtask 1");

    // Clear name input -- should not submit
    await userEvent.clear(titleInput);
    await userEvent.click(createTaskButton);
    expect(createTaskFn).not.toHaveBeenCalled();

    // Re-type name
    await userEvent.type(titleInput, "Test Task");

    // Add new subtasks, plus one mistake
    await userEvent.click(addNewSubtaskButton);
    await userEvent.click(addNewSubtaskButton);
    await userEvent.click(addNewSubtaskButton);

    const newSubtaskInputs = canvas.getAllByLabelText("blank subtask");
    expect(newSubtaskInputs).toHaveLength(3);

    await userEvent.type(newSubtaskInputs[0], "Subtask 2");
    await userEvent.type(newSubtaskInputs[1], "Mistake");
    await userEvent.type(newSubtaskInputs[2], "Subtask 3");

    // Delete mistake
    const deleteMistakeButton = canvas.getByText("Delete subtask Mistake");
    await userEvent.click(deleteMistakeButton);

    // Update status to "Done"
    await userEvent.selectOptions(statusSelect, "Done");

    // Final submission should be valid and send the right data
    await userEvent.click(createTaskButton);

    expect(createTaskFn).toHaveBeenCalledTimes(1);
    const { detail: newTaskData } = createTaskFn.mock.lastCall[0];

    expect(newTaskData).toStrictEqual({
      title: "Test Task",
      description: "Some task description",
      subtasks: ["Subtask 1", "Subtask 2", "Subtask 3"],
      status: "Done",
    });
  }}
/>
