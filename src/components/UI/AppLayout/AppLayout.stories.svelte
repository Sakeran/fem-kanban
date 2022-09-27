<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import AppLayout from "./AppLayout.svelte";

  import { createMockBoards } from "../../../helpers/mocks";
  import { loadBoards, setCurrentBoardId } from "../../../stores/boardData";

  loadBoards(createMockBoards());
  setCurrentBoardId("0");
</script>

<Meta title="UI/AppLayout" component={AppLayout} />

<Template let:args>
  <AppLayout {...args} />
</Template>

<Story name="Default" args={{}} parameters={{ layout: "fullscreen" }} />
