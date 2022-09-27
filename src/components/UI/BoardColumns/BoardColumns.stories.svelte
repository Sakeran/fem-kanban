<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import BoardColumns from "./BoardColumns.svelte";

  import { createMockBoards } from "../../../helpers/mocks";
  import { loadBoards, setCurrentBoardId } from "../../../stores/boardData";

  loadBoards(createMockBoards());
  setCurrentBoardId("0");
</script>

<Meta title="UI/BoardColumns" component={BoardColumns} />

<Template let:args>
  <BoardColumns {...args} />
</Template>

<Story name="Default" args={{}} />

