<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import Logo from "./Logo.svelte";
</script>

<Meta title="Misc/Logo" component={Logo} />

<Template>
  <div><Logo /></div>
</Template>

<Story name="Default" />
