<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import BoardColumn from "./BoardColumn.svelte";

  import boardData from "../../../helpers/mockData.json";
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
    columnData: {
      name: "Todo",
      boardColor: "#49C4E5",
      tasks: [],
    },
  }}
/>

<Story
  name="With Tasks"
  args={{
    columnData: boardData.boards[0].columns[0],
  }}
/>
