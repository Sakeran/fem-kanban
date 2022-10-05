<script lang="ts">
  import checkReducedMotion from "../../../helpers/checkReducedMotion";
  import { createEventDispatcher } from "svelte";
  import { scale } from "svelte/transition";
  import { mountContent } from "./portal";
  import type { AriaProps, ModalParameters } from "./types";

  export let open: boolean = false;

  export let aria: AriaProps = {};

  if (!aria.label && !aria.labelledby) {
    console.warn("Modal component created without an accessible label.");
  }

  const dispatch = createEventDispatcher();

  function onRequestClose() {
    dispatch("requestClose");
  }

  // Modal action function
  function modal(node, parameters: ModalParameters) {
    const unmount = mountContent(node, parameters);

    return {
      destroy: unmount,
    };
  }
</script>

{#if open}
  <div
    use:modal={{ onRequestClose }}
    transition:scale={{ duration: checkReducedMotion(150, 0) }}
    aria-label={aria.label || null}
    aria-labelledby={aria.labelledby || null}
    aria-describedby={aria.describedby || null}
    aria-modal="true"
    role="dialog"
  >
    <slot />
  </div>
{/if}

<style lang="postcss" global>
  #kanban-modal-portal {
    z-index: 9999;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: hsla(0, 0%, 0%, 0);
    transition: background-color 150ms ease-in-out;
  }

  #kanban-modal-portal.modal-scrim {
    background-color: hsla(0, 0%, 0%, 0.5);
  }

  .modal-container {
    position: fixed;
    inset: 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-container > * {
    position: relative;
  }
</style>
