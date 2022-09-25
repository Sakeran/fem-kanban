<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import BoardColumns from "./BoardColumns.svelte";

  import boardData from "../../../helpers/mockData.json";
</script>

<Meta
  title="UI/BoardColumns"
  component={BoardColumns}
  argTypes={{
    sidebarExpanded: { control: "boolean" },
  }}
/>

<Template let:args>
  <BoardColumns {...args} />
</Template>

<Story
  name="Default"
  args={{ board: boardData.boards[0], sidebarExpanded: false }}
/>

<Story
  name="With Sidebar Expanded"
  args={{ board: boardData.boards[0], sidebarExpanded: true }}
/>
