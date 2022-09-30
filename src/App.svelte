<script lang="ts">
  import AppLayout from "./components/UI/AppLayout/AppLayout.svelte";

  import { colorScheme } from "./stores/appControls";

  // Handle changes to color scheme state
  $: {
    if ($colorScheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }
</script>

<AppLayout />
