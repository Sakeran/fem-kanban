<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Sidebar from "./Sidebar.svelte";

  import { createMockBoards } from "../../../helpers/mocks";
  import { loadBoards, setCurrentBoardId } from "../../../stores/boardData";

  loadBoards(createMockBoards());
  setCurrentBoardId("0");
</script>

<Meta
  title="UI/Sidebar"
  component={Sidebar}
  argTypes={{ forceExpanded: { control: "boolean" } }}
/>

<Template let:args>
  <Sidebar {...args} />
</Template>

<Story name="Hidden" args={{}} />

<Story name="Expanded" args={{ forceExpanded: true }} />
