<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import InputList from "./InputList.svelte";
</script>

<Meta
  title="Interactive/InputList"
  component={InputList}
  argTypes={{
    label: { control: "text" },
    buttonText: { control: "text" },
    items: { control: "array" },
    actionUpdate: { action: "actionUpdate" },
  }}
/>

<Template let:args>
  <div style="max-width: 26rem;">
    <InputList {...args} on:actionUpdate={args.actionUpdate} />
  </div>
</Template>

<Story name="Empty" args={{ label: "Subtasks", items: [] }} />

<Story
  name="Existing Items"
  args={{
    label: "Subtasks",
    items: ["Define User Model", "Add auth endpoints"],
  }}
/>

<Story
  name="Delete Items"
  args={{
    label: "Subtasks",
    items: ["Define User Model", "Add auth endpoints"],
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const deleteButton = canvas.getByText("Delete subtask Define User Model");

    await userEvent.click(deleteButton);

    const deletedInput = canvas.queryByLabelText("Define User Model");
    expect(deletedInput).not.toBeInTheDocument();
  }}
/>

<Story
  name="Add New Items"
  args={{
    label: "Subtasks",
    items: ["Define User Model", "Add auth endpoints"],
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const addButton = canvas.getByText("Add New Subtask");

    await userEvent.click(addButton);

    const newInput = canvas.getByLabelText("blank subtask");
    await userEvent.type(newInput, "Do another thing");
  }}
/>
