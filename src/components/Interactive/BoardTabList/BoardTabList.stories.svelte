<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import BoardTabList from "./BoardTabList.svelte";
</script>

<Meta
  title="Interactive/BoardTabList"
  component={BoardTabList}
  argTypes={{
    boards: { control: "object" },
    label: { control: "text" },
    selectedBoardId: { control: "number" },

    boardSelected: { action: "boardSelected" },
    createNewBoard: { action: "createNewBoard" },
  }}
/>

<Template let:args>
  <div style="max-width: 15.625rem;">
    <BoardTabList
      {...args}
      on:boardSelected={args.boardSelected}
      on:createNewBoard={args.createNewBoard}
    />
  </div>
</Template>

<Story name="Empty List" args={{ boards: [] }} />

<Story
  name="Populated List (Default Selection)"
  args={{
    boards: [
      { name: "Platform Launch", id: 1 },
      { name: "Marketing Plan", id: 2 },
      { name: "Roadmap", id: 3 },
    ],
  }}
/>

<Story
  name="Populated List (Explicit Selection)"
  args={{
    boards: [
      { name: "Platform Launch", id: 1 },
      { name: "Marketing Plan", id: 2 },
      { name: "Roadmap", id: 3 },
    ],
    selectedBoardId: 3,
  }}
/>

<Story
  name="Select Board"
  args={{
    boards: [
      { name: "Platform Launch", id: 1 },
      { name: "Marketing Plan", id: 2 },
      { name: "Roadmap", id: 3 },
    ],
    selectedBoardId: 1,
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByText("Marketing Plan");
    await userEvent.click(button);

    expect(args.boardSelected).toHaveBeenCalled();

    const { detail: boardId } = args.boardSelected.mock.lastCall[0];
    expect(boardId).toBe(2);
  }}
/>

<Story
  name="Create New Board"
  args={{
    boards: [
      { name: "Platform Launch", id: 1 },
      { name: "Marketing Plan", id: 2 },
      { name: "Roadmap", id: 3 },
    ],
    selectedBoardId: 1,
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByText("Create New Board");
    await userEvent.click(button);

    expect(args.createNewBoard).toHaveBeenCalled();
  }}
/>