<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import AppLayout from "./AppLayout.svelte";

  import { mockAppStore } from "../../../helpers/mockAppStore";
  import { createAppStateContext } from "../../../stores/appStore";

  createAppStateContext(mockAppStore);
</script>

<Meta title="UI/AppLayout" component={AppLayout} />

<Template let:args>
  <AppLayout {...args} />
</Template>

<Story
  name="Default"
  args={{}}
  parameters={{ layout: "fullscreen" }}
/>
