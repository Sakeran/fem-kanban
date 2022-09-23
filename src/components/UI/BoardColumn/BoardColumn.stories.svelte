<script lang="ts">
  import { Meta, Story, Template } from "@storybook/addon-svelte-csf";
  import BoardColumn from "./BoardColumn.svelte";
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
    <BoardColumn {...args} on:taskSelected={args.taskSelected} />
  </div>
</Template>

<Story
  name="Empty"
  args={{
    columnData: {
      name: "Todo",
      boardColor: "#49C4E5",
      tasks: [],
    },
  }}
/>

<Story
  name="With Tasks"
  args={{
    columnData: {
      name: "Todo",
      boardColor: "#49C4E5",
      tasks: [
        {
          id: "1",
          title: "Build UI for onboarding flow",
          description: "",
          status: "Todo",
          subtasks: [
            {
              title: "Sign up page",
              isCompleted: true,
            },
            {
              title: "Sign in page",
              isCompleted: false,
            },
            {
              title: "Welcome page",
              isCompleted: false,
            },
          ],
        },
        {
          id: "2",
          title: "Build UI for search",
          description: "",
          status: "Todo",
          subtasks: [
            {
              title: "Search page",
              isCompleted: false,
            },
          ],
        },
        {
          id: "3",
          title: "Build settings UI",
          description: "",
          status: "Todo",
          subtasks: [
            {
              title: "Account page",
              isCompleted: false,
            },
            {
              title: "Billing page",
              isCompleted: false,
            },
          ],
        },
        {
          id: "4",
          title: "QA and test all major user journeys",
          description:
            "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
          status: "Todo",
          subtasks: [
            {
              title: "Internal testing",
              isCompleted: false,
            },
            {
              title: "External testing",
              isCompleted: false,
            },
          ],
        },
      ],
    },
  }}
/>
