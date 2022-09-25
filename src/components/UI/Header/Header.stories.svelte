<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";

  import Header from "./Header.svelte";
</script>

<Meta
  title="UI/Header"
  component={Header}
  argTypes={{
    boardName: { control: "text" },

    toggleBoardsMenu: { action: "toggleBoardsMenu" },
    addNewTask: { action: "addNewTask" },
    editBoard: { action: "editBoard" },
    deleteBoard: { action: "deleteBoard" },
  }}
/>

<Template let:args>
  <Header
    {...args}
    on:toggleBoardsMenu={args.toggleBoardsMenu}
    on:addNewTask={args.addNewTask}
    on:editBoard={args.editBoard}
    on:deleteBoard={args.deleteBoard}
  />
</Template>

<Story name="Default" args={{ boardName: "Platform Launch" }} />

<Story name="No Given Board" args={{}} />

<Story
  name="Interactions (Desktop)"
  args={{ boardName: "Platform Launch" }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Getting the "current" Add Task button takes a little extra effort, since
    // it changes depending on screen width. Assume a desktop setting, which should
    // be the second element. (We would ideally refactor to use test-ids, but this
    // works for now.)
    const addTaskButton = canvas
      .getAllByText("Add New Task")
      .map((e) => e.closest("button"))[1];
    expect(addTaskButton).toBeVisible();

    // Get the options menu button
    const optionsMenu = canvas.getByText("Board Options").closest("button");

    // Test add task button
    await userEvent.click(addTaskButton);
    expect(args.addNewTask).toHaveBeenCalled();

    // Loosely test the options menu (keyboard)
    optionsMenu.focus();
    expect(optionsMenu).toHaveFocus();
    await userEvent.keyboard("{Enter}");
    await userEvent.keyboard(" ");
    expect(args.editBoard).toHaveBeenCalled();
  }}
/>

<Story
  name="Interactions (Mobile)"
  parameters={{
    viewport: { viewports: INITIAL_VIEWPORTS, defaultViewport: "iphone6" },
  }}
  args={{ boardName: "Platform Launch" }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Get the "toggle board select" button
    const toggleBoardButton = canvas.getByText("Open Board Selection");

    // Get the "current" Add Task button (that is, the one viewable on mobile)
    const addTaskButton = canvas
      .getAllByText("Add New Task")
      .map((e) => e.closest("button"))[0];
    expect(addTaskButton).toBeVisible();

    // Get the options menu button
    const optionsMenu = canvas.getByText("Board Options").closest("button");

    // Test menu toggle
    await userEvent.click(toggleBoardButton);
    expect(args.toggleBoardsMenu).toHaveBeenCalled();

    // Test add task button
    await userEvent.click(addTaskButton);
    expect(args.addNewTask).toHaveBeenCalled();

    // Loosely test the options menu (touch/mouse)
    await userEvent.click(optionsMenu);
    const editButton = canvas.getByText("Edit Board");
    await userEvent.click(editButton);
    expect(args.editBoard).toHaveBeenCalled();
  }}
/>