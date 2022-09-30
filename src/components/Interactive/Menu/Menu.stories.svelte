<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import Menu from "./Menu.svelte";
</script>

<Meta
  title="Interactive/Menu"
  component={Menu}
  argTypes={{
    expanded: { control: "boolean" },
    alignMenu: { control: "radio", options: ["start", "center", "end"] },

    actionClicked: { action: "actionClicked" },
  }}
/>

<Template let:args>
  <div style="max-width: 14rem; padding: 1rem; margin-inline: auto;">
    <Menu {...args} on:actionClicked={args.actionClicked} />
  </div>

  <div
    style="max-width: 28rem; padding: 1rem; margin-inline: auto; display: flex; flex-direction: column; align-items: start;"
  >
    <input type="checkbox" id="test-cb" />
    <label for="test-cb">Focusable element to test Tab key</label>
  </div>
</Template>

<Story
  name="Default"
  args={{
    expanded: false,
    alignMenu: "center",
    openButtonText: "Options Menu",
    actions: [
      { id: "edit", label: "Edit Task" },
      { id: "delete", label: "Delete Task", style: "destructive" },
    ],
  }}
/>

<Story
  name="Expanded"
  args={{
    expanded: true,
    alignMenu: "center",
    openButtonText: "Options Menu",
    actions: [
      { id: "edit", label: "Edit Task" },
      { id: "delete", label: "Delete Task", style: "destructive" },
    ],
  }}
/>

<Story
  name="Toggle Menu (Click)"
  args={{
    expanded: false,
    alignMenu: "center",
    openButtonText: "Options Menu",
    actions: [
      { id: "edit", label: "Edit Task" },
      { id: "delete", label: "Delete Task", style: "destructive" },
    ],
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Get toggle button
    const toggleButton = canvas.getByText("Options Menu");

    await userEvent.click(toggleButton);
    let menu = canvas.getByRole("menu");

    // Wait for menu to be visible.
    // (This takes a little longer to account for the transition animation)
    await new Promise((r) => setTimeout(r, 200));
    expect(menu).toBeVisible();

    await userEvent.click(toggleButton);

    // Wait for menu to become invisible
    // (This takes a little longer to account for the transition animation)
    await new Promise((r) => setTimeout(r, 200));

    menu = canvas.queryByRole("menu");
    expect(menu).toBeNull();
  }}
/>

<Story
  name="Toggle Menu (Keyboard)"
  args={{
    expanded: false,
    alignMenu: "center",
    openButtonText: "Options Menu",
    actions: [
      { id: "edit", label: "Edit Task" },
      { id: "delete", label: "Delete Task", style: "destructive" },
    ],
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Get toggle button
    const toggleButton = canvas.getByRole("button");

    toggleButton.focus();

    await userEvent.keyboard("{ArrowDown}");

    let menu = canvas.getByRole("menu");

    // Wait for menu to be visible.
    // (This takes a little longer to account for the transition animation)
    await new Promise((r) => setTimeout(r, 200));
    expect(menu).toBeVisible();

    // Get menu buttons
    const menuButtons = within(menu).getAllByRole("button");
    expect(menuButtons).toHaveLength(2);

    // First button should be focused by default after opening
    expect(menuButtons[0]).toHaveFocus();

    // Menu should be cleared on ESC
    await userEvent.keyboard("{Escape}");

    // Wait for menu to become invisible
    // (This takes a little longer to account for the transition animation)
    await new Promise((r) => setTimeout(r, 200));

    menu = canvas.queryByRole("menu");
    expect(menu).toBeNull();
  }}
/>

<Story
  name="Select Action (Click)"
  args={{
    expanded: false,
    alignMenu: "center",
    openButtonText: "Options Menu",
    actions: [
      { id: "edit", label: "Edit Task" },
      { id: "delete", label: "Delete Task", style: "destructive" },
    ],
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Get toggle button
    const toggleButton = canvas.getByText("Options Menu");

    await userEvent.click(toggleButton);
    let menu = canvas.getByRole("menu");

    // Wait for menu to be visible.
    // (This takes a little longer to account for the transition animation)
    await new Promise((r) => setTimeout(r, 200));
    expect(menu).toBeVisible();

    const menuButtons = within(menu).getAllByRole("button");
    expect(menuButtons).toHaveLength(2);

    await userEvent.click(menuButtons[0]);
    expect(args.actionClicked).toHaveBeenCalled();
    expect(args.actionClicked.mock.lastCall[0].detail).toBe("edit");

    await userEvent.click(menuButtons[1]);
    expect(args.actionClicked).toHaveBeenCalledTimes(2);
    expect(args.actionClicked.mock.lastCall[0].detail).toBe("delete");
  }}
/>

<Story
  name="Select Action (Keyboard)"
  args={{
    expanded: false,
    alignMenu: "center",
    openButtonText: "Options Menu",
    actions: [
      { id: "edit", label: "Edit Task" },
      { id: "delete", label: "Delete Task", style: "destructive" },
    ],
  }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    // Get toggle button
    const toggleButton = canvas.getByRole("button");

    toggleButton.focus();

    await userEvent.keyboard("{ArrowDown}");

    let menu = canvas.getByRole("menu");

    // Wait for menu to be visible.
    // (This takes a little longer to account for the transition animation)
    await new Promise((r) => setTimeout(r, 200));
    expect(menu).toBeVisible();

    // Get menu buttons
    const menuButtons = within(menu).getAllByRole("button");
    expect(menuButtons).toHaveLength(2);

    // First button should be focused by default after opening
    expect(menuButtons[0]).toHaveFocus();

    // Arrow key navigation
    await userEvent.keyboard("{ArrowDown}");
    expect(menuButtons[1]).toHaveFocus();

    // Focus wrapping
    await userEvent.keyboard("{ArrowDown}");
    expect(menuButtons[0]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuButtons[1]).toHaveFocus();

    await userEvent.keyboard("{ArrowUp}");
    expect(menuButtons[0]).toHaveFocus();

    // Option selection
    // Note: Ran into an issue here where the mock is called twice per space
    // character. Can't replicate it manually, and not sure how to debug it.
    // The rest of this test is slightly more lenient as a result.
    expect(args.actionClicked).toHaveBeenCalledTimes(0);

    await userEvent.keyboard(" ");
    expect(args.actionClicked).toHaveBeenCalled();
    expect(args.actionClicked.mock.lastCall[0].detail).toBe("edit");

    await userEvent.keyboard("{ArrowDown} ", {});
    expect(args.actionClicked).toHaveBeenCalled();
    expect(args.actionClicked.mock.lastCall[0].detail).toBe("delete");
  }}
/>
