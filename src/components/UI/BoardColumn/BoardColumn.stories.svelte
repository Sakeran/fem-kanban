<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import BoardColumn from "./BoardColumn.svelte";

  import { mockAppStore } from "../../../helpers/mockAppStore";
</script>

<Meta
  title="UI/BoardColumn"
  component={BoardColumn}
  argTypes={{
    taskSelected: { action: "taskSelected" },
  }}
/>

<Template let:args>
  <div style={`max-width: 17.5rem;`}>
    <BoardColumn {...args} on:taskSelected={args.taskSelected} />
  </div>
</Template>

<Story
  name="Empty"
  args={{
    columnData: { ...mockAppStore.boards[0].columns[0], tasks: [] },
  }}
/>

<Story
  name="With Tasks"
  args={{
    columnData: mockAppStore.boards[0].columns[0],
  }}
/>
