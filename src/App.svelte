<script lang="ts">
  import AppLayout from "./components/UI/AppLayout/AppLayout.svelte";
  import { mockBoardData } from "./helpers/mockBoardData";
  import Board from "./lib/board/board";

  import { colorScheme } from "./stores/appControls";
  import { loadBoards } from "./stores/boardData";

  // Handle changes to color scheme state
  $: {
    if ($colorScheme === "dark") {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }

  // TEMP: Setup board data
  loadBoards(mockBoardData.map((data) => Board.createFromData(data)));
</script>

<AppLayout />
