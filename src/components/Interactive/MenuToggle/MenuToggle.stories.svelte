<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect, jest } from "@storybook/jest";

  import MenuToggle from "./MenuToggle.svelte";
</script>

<Meta
  title="Interactive/MenuToggle"
  component={MenuToggle}
  argTypes={{ textAlternative: { control: "text" } }}
  parameters={{ actions: { handles: ["click"] } }}
/>

<Template>
  <MenuToggle textAlternative="Open Menu" />
</Template>

<Story
  name="Default"
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByText("Open Menu");

    const fn = jest.fn();
    button.addEventListener('click', fn);

    await userEvent.click(button);

    expect(fn).toHaveBeenCalled();
  }}
/>
