<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Sidebar from "./Sidebar.svelte";

  import mockData from "../../../helpers/mockData.json";
</script>

<Meta title="UI/Sidebar" component={Sidebar} />

<Template let:args>
  <Sidebar {...args} />
</Template>

<Story name="Default" args={{ boardData: mockData }} />
