<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import { expect, jest } from "@storybook/jest";
  import Select from "./Select.svelte";
</script>

<Meta
  title="Interactive/Select"
  component={Select}
  argTypes={{
    options: { control: "array" },
  }}
  parameters={{ actions: { handles: ["change"] } }}
/>

<Template let:args>
  <div style="max-width: 26rem;">
    <Select {...args} />
  </div>
</Template>

<Story
  name="Default"
  args={{ label: "Dropdown", options: ["Todo", "Doing", "Done"] }}
/>

<Story
  name="Explicit Selection"
  args={{
    label: "Dropdown",
    options: ["Todo", "Doing", "Done"],
    value: "Doing",
  }}
/>

<Story
  name="Selection"
  args={{
    label: "Dropdown",
    options: ["Todo", "Doing", "Done"],
  }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const select = canvas.getByLabelText("Dropdown");

    const fn = jest.fn();
    select.addEventListener("change", fn);

    await userEvent.selectOptions(select, "Done");
    expect(select).toHaveProperty("value", "Done");

    expect(fn).toHaveBeenCalled();
  }}
/>
