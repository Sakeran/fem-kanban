<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import AppLayout from "./AppLayout.svelte";

  import boardData from "../../../helpers/mockData.json";
</script>

<Meta title="UI/AppLayout" component={AppLayout} />

<Template let:args>
  <AppLayout {...args} />
</Template>

<Story
  name="Default"
  args={{ boardData: boardData, currentBoard: boardData.boards[0] }}
  parameters={{ layout: "fullscreen" }}
/>
