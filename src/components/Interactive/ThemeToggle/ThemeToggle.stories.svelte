<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect } from "@storybook/jest";
  import ThemeToggle from "./ThemeToggle.svelte";
</script>

<Meta
  title="Interactive/ThemeToggle"
  component={ThemeToggle}
  argTypes={{
    theme: { options: ["light", "dark"] },
    toggled: { action: "toggled" },
  }}
/>

<Template let:args>
  <div style="max-width: 15.625rem;"><ThemeToggle {...args} on:toggled={args.toggled} /></div>
</Template>

<Story name="Default" args={{}} />

<Story name="Toggled Light Mode" args={{ theme: "light" }} />

<Story name="Toggled Dark Mode" args={{ theme: "dark" }} />

<Story
  name="Cycle Toggles"
  args={{ theme: "light" }}
  play={async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const toggle = canvas.getByText("Switch to dark mode");

    await userEvent.click(toggle);
    expect(args.toggled).toHaveBeenCalledTimes(1);
    
    const { detail: newToggleStatus } = args.toggled.mock.lastCall[0];
    expect(newToggleStatus).toBe("dark");

    const toggle2 = canvas.getByText("Switch to light mode");
    expect(toggle).toBe(toggle2);

    await userEvent.click(toggle);
    expect(args.toggled).toHaveBeenCalledTimes(2);

    const { detail: newToggleStatus2 } = args.toggled.mock.lastCall[0];
    expect(newToggleStatus2).toBe("light");
  }}
/>
