<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import DeleteItemCard from "./DeleteItemCard.svelte";
</script>

<Meta
  title="UI/DeleteItemCard"
  component={DeleteItemCard}
  argTypes={{
    itemName: { control: "text" },
    cancel: { action: "cancel" },
    confirmDelete: { action: "confirmDelete" },
  }}
/>

<Template let:args>
  <div
    style="max-width: 32rem; padding: 1rem; background-color: hsl(0 0% 0% / .4);"
  >
    <DeleteItemCard
      {...args}
      on:cancel={args.cancel}
      on:confirmDelete={args.confirmDelete}
    />
  </div>
</Template>

<Story
  name="Default"
  args={{
    title: "Delete this task?",
    message:
      "Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This action cannot be reversed.",
  }}
/>

<Story
  name="Actions"
  args={{
    title: "Delete this board?",
    message:
      "Are you sure you want to delete the ‘Platform Launch’ board? This action will remove all columns and tasks and cannot be reversed.",
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const cancelFn = args.cancel;
    const confirmDeleteFn = args.confirmDelete;

    // Get Inputs
    const deleteButton = canvas.getByText("Delete");
    const cancelButton = canvas.getByText("Cancel");

    // Cancel Action
    await userEvent.click(cancelButton);

    expect(cancelFn).toBeCalledTimes(1);
    expect(confirmDeleteFn).toBeCalledTimes(0);

    // Delete Action
    await userEvent.click(deleteButton);

    expect(cancelFn).toBeCalledTimes(1);
    expect(confirmDeleteFn).toBeCalledTimes(1);
  }}
/>
