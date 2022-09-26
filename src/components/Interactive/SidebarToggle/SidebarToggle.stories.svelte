<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import SidebarToggle from "./SidebarToggle.svelte";
</script>

<Meta
  title="Interactive/SidebarToggle"
  component={SidebarToggle}
  argTypes={{
    sidebarExpanded: { control: "boolean" },

    toggle: { action: "toggle" },
  }}
/>

<Template let:args>
  <div style="max-width: 15.625rem;">
    <SidebarToggle {...args} on:toggle={args.toggle} />
  </div>
</Template>

<Story name="Sidebar Visible" args={{ sidebarExpanded: true}} />

<Story name="Sidebar Hidden" args={{ sidebarExpanded: false}} />

<Story
  name="Toggle Sidebar"
  args={{ sidebarExpanded: true}}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);

    const toggle = canvas.getByText("Hide Sidebar");
    await userEvent.click(toggle);

    expect(args.toggle).toHaveBeenCalledTimes(1);
    expect(args.toggle.mock.lastCall[0].detail).toBe(false);

    await userEvent.click(toggle);

    expect(args.toggle).toHaveBeenCalledTimes(2);
    expect(args.toggle.mock.lastCall[0].detail).toBe(true);
  }}
/>
