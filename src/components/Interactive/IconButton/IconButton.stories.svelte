<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import { userEvent, within } from "@storybook/testing-library";
  import IconButton from "./IconButton.svelte";
</script>

<Meta
  title="Interactive/IconButton"
  component={IconButton}
  argTypes={{
    textAlternative: { control: "text" },
    disabled: { control: "boolean" },
  }}
  parameters={{ actions: { handles: ["click"] } }}
/>

<Template let:args>
  <IconButton {...args}
    ><svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.368 12V7.344H12V4.632H7.368V0H4.656V4.632H0V7.344H4.656V12H7.368Z"
        fill="white"
      />
    </svg>
  </IconButton>
</Template>

<Story name="Default" args={{ textAlternative: "Add New Task" }} />

<Story
  name="Click"
  args={{ textAlternative: "Add New Task" }}
  play={async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByText("Add New Task");
    await userEvent.click(button);
  }}
/>

<Story
  name="Disabled"
  args={{ textAlternative: "Add New Task", disabled: true }}
/>
