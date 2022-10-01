<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import BoardColumn from "./BoardColumn.svelte";

  import { createMockColumn } from "../../../helpers/mocks";

  const columnData = createMockColumn();
</script>

<Meta
  title="UI/BoardColumn"
  component={BoardColumn}
  argTypes={{
    taskSelected: { action: "taskSelected" },
  }}
/>

<Template let:args>
  <div style={`max-width: 17.5rem;`}>
    <BoardColumn {columnData} on:taskSelected={args.taskSelected} />
  </div>
</Template>

<Story name="Empty" let:args>
  <div style={`max-width: 17.5rem;`}>
    <BoardColumn
      columnData={Object.assign({}, columnData, { tasks: [] })}
      on:taskSelected={args.taskSelected}
    />
  </div>
</Story>

<Story name="With Tasks" />
