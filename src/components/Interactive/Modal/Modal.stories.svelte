<script lang="ts">
  import { Meta, Story } from "@storybook/addon-svelte-csf";
  import Heading from "../../Typography/Heading/Heading.svelte";
  import { createMockBoards } from "../../../helpers/mocks";
  import ViewTaskCard from "../../UI/ViewTaskCard/ViewTaskCard.svelte";
  import Button from "../Button/Button.svelte";

  import Modal from "./Modal.svelte";

  // Controls for Default Story
  let open = false;

  const toggle = () => (open = !open);

  // Controls for Multiples Story
  let open1 = false;
  let open2 = false;
  let open3 = false;

  const toggleMulti = (id) => {
    if (id == 1) return (open1 = !open1);
    if (id == 2) return (open2 = !open2);
    if (id == 3) return (open3 = !open3);
  };

  const board = createMockBoards()[0];
  const task = board.columns[0].tasks[0];
</script>

<Meta
  title="Interactive/Modal"
  component={Modal}
  argTypes={{
    requestClose: { action: "requestClose" },
  }}
/>

<Story name="Default" let:args>
  <Modal
    {open}
    on:requestClose={() => {
      args.requestClose();
      toggle();
    }}
    aria={{ label: "Single Modal Example" }}
  >
    <div style="width: 100vw; max-width: 30rem;">
      <ViewTaskCard {task} />
    </div>
  </Modal>

  <Button on:click={() => (open = !open)} style="Secondary">Toggle Modal</Button
  >
</Story>

<Story name="Multiple Modals" let:args>
  <Modal
    open={open1}
    on:requestClose={() => toggleMulti(1)}
    aria={{ labelledby: "story-modal-1" }}
  >
    <div
      style="width: 80vmin; aspect-ratio: 1; background-color: white; padding: 1rem"
    >
      <Heading id="story-modal-1">Modal 1</Heading>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Button on:click={() => toggleMulti(1)} style="Secondary"
          >Toggle Modal 1</Button
        >
        <Button on:click={() => toggleMulti(2)} style="Secondary"
          >Toggle Modal 2</Button
        >
        <Button on:click={() => toggleMulti(3)} style="Secondary"
          >Toggle Modal 3</Button
        >
      </div>
    </div>
  </Modal>
  <Modal
    open={open2}
    on:requestClose={() => toggleMulti(2)}
    aria={{ label: "Modal 2" }}
  >
    <div
      style="width: 60vmin; aspect-ratio: 1; background-color: white; padding: 1rem"
    >
      <Heading>Modal 2</Heading>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Button on:click={() => toggleMulti(1)} style="Secondary"
          >Toggle Modal 1</Button
        >
        <Button on:click={() => toggleMulti(2)} style="Secondary"
          >Toggle Modal 2</Button
        >
        <Button on:click={() => toggleMulti(3)} style="Secondary"
          >Toggle Modal 3</Button
        >
      </div>
    </div>
  </Modal>
  <Modal
    open={open3}
    on:requestClose={() => toggleMulti(3)}
    aria={{ label: "Modal 3" }}
  >
    <div
      style="width: 40vmin; aspect-ratio: 1; background-color: white; padding: 1rem"
    >
      <Heading>Modal 3</Heading>
      <div style="display: flex; flex-direction: column; gap: 1rem;">
        <Button on:click={() => toggleMulti(1)} style="Secondary"
          >Toggle Modal 1</Button
        >
        <Button on:click={() => toggleMulti(2)} style="Secondary"
          >Toggle Modal 2</Button
        >
        <Button on:click={() => toggleMulti(3)} style="Secondary"
          >Toggle Modal 3</Button
        >
      </div>
    </div>
  </Modal>

  <Button
    on:click={() => {
      open1 = true;
      setTimeout(() => (open2 = true), 500);
      setTimeout(() => (open3 = true), 1000);
    }}
    style="Secondary">Launch All Modals</Button
  >
  <ul>
    <li>Modal 1 is {open1 ? "open" : "hidden"}.</li>
    <li>Modal 2 is {open2 ? "open" : "hidden"}.</li>
    <li>Modal 3 is {open3 ? "open" : "hidden"}.</li>
  </ul>
</Story>
