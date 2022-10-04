<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import ViewTaskCard from "./ViewTaskCard.svelte";
  import { createMockTask } from "../../../helpers/mocks";

  const task = createMockTask();
  const noSubtasksTask = createMockTask();
  noSubtasksTask.subtasks = [];
</script>

<Meta
  title="UI/ViewTaskCard"
  component={ViewTaskCard}
  argTypes={{
    toggleSubtask: { action: "toggleSubtask" },
    updateStatus: { action: "updateStatus" },
    editTask: { action: "editTask" },
    deleteTask: { action: "deleteTask" },
  }}
/>

<Story name="Default" let:args>
  <div
    style="max-width: 30rem; padding: 1rem; background-color: hsl(0 0% 0% / .4);"
  >
    <ViewTaskCard
      {task}
      on:toggleSubtask={args.toggleSubtask}
      on:updateStatus={args.updateStatus}
      on:editTask={args.editTask}
      on:deleteTask={args.deleteTask}
    />
  </div>
</Story>

<Story name="No Subtasks" let:args>
  <div
    style="max-width: 30rem; padding: 1rem; background-color: hsl(0 0% 0% / .4);"
  >
    <ViewTaskCard
      task={noSubtasksTask}
      on:toggleSubtask={args.toggleSubtask}
      on:updateStatus={args.updateStatus}
      on:editTask={args.editTask}
      on:deleteTask={args.deleteTask}
    />
  </div>
</Story>
