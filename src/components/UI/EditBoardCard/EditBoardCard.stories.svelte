<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import EditBoardCard from "./EditBoardCard.svelte";
</script>

<Meta
  title="UI/EditBoardCard"
  component={EditBoardCard}
  argTypes={{
    submitBoard: { action: "submitBoard" },
  }}
/>

<Template let:args>
  <div
    style="max-width: 30rem; padding: 1rem; background-color: hsl(0 0% 0% / .4);"
  >
    <EditBoardCard {...args} on:submitBoard={args.submitBoard} />
  </div>
</Template>

<Story
  name="Default"
  args={{ title: "Add New Board", submitButtonText: "Create New Board" }}
/>

<Story
  name="Edit Existing Card"
  args={{
    name: "Existing Board",
    columns: ["Column 1", "Column 2", "Column 3"],
    title: "Edit Board",
    submitButtonText: "Save Changes",
  }}
/>

<Story
  name="Create Board"
  args={{}}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const createBoardFn = args.submitBoard;

    // Get Inputs
    const nameInput = canvas.getByLabelText("Board Name");
    const addNewColumnButton = canvas.getByText("Add New Column");
    const createBoardButton = canvas.getByText("Create New Board");

    // Should not submit without a name
    await userEvent.click(createBoardButton);
    expect(createBoardFn).not.toHaveBeenCalled();

    await userEvent.type(nameInput, "Test Board Name");

    // Input first column name
    await userEvent.click(addNewColumnButton);
    const firstColumnInput = canvas.getByLabelText("blank column");
    await userEvent.type(firstColumnInput, "Todo");

    // Clear name input -- should not submit
    await userEvent.clear(nameInput);
    await userEvent.click(createBoardButton);
    expect(createBoardFn).not.toHaveBeenCalled();

    // Re-type name
    await userEvent.type(nameInput, "Test Board Name");

    // Add new columns, plus one mistake
    await userEvent.click(addNewColumnButton);
    await userEvent.click(addNewColumnButton);
    await userEvent.click(addNewColumnButton);

    const newColumnInputs = canvas.getAllByLabelText("blank column");
    expect(newColumnInputs).toHaveLength(3);

    await userEvent.type(newColumnInputs[0], "Doing");
    await userEvent.type(newColumnInputs[1], "Mistake");
    await userEvent.type(newColumnInputs[2], "Done");

    // Delete mistake
    const deleteMistakeButton = canvas.getByText("Delete column Mistake");
    await userEvent.click(deleteMistakeButton);

    // Final submission should be valid and send the right data
    await userEvent.click(createBoardButton);

    expect(createBoardFn).toHaveBeenCalledTimes(1);
    const { detail: newBoardData } = createBoardFn.mock.lastCall[0];

    expect(newBoardData.name).toBe("Test Board Name");
    expect(newBoardData.columns).toStrictEqual(["Todo", "Doing", "Done"]);
  }}
/>
