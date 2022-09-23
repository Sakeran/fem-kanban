<script context="module" lang="ts">
  type MenuLabelStyle = "normal" | "destructive";
  type MenuAction = { id: string; label: string; style?: MenuLabelStyle };
  type MenuAlignment = "start" | "center" | "end";

  const labelStyles = {
    normal: "text-left text-gray-medium",
    destructive: "text-left text-red-normal",
  };
</script>

<script lang="ts">
  import { createEventDispatcher, tick } from "svelte";
  import { slide } from "svelte/transition";

  import checkReducedMotion from "../../../helpers/checkReducedMotion";

  import Text from "../../Typography/Text/Text.svelte";
  import MenuToggle from "../MenuToggle/MenuToggle.svelte";

  export let openButtonText: string;
  export let expanded: boolean = false;
  export let actions: [MenuAction, ...MenuAction[]];
  export let alignMenu: MenuAlignment = "center";

  let menuToggle;
  let menuContainer: HTMLDivElement;
  let windowListener;

  const dispatch = createEventDispatcher();

  async function toggleMenu() {
    expanded = !expanded;

    await tick();

    if (expanded) {
      return setupWindowListener();
    }

    return clearWindowListener();
  }

  async function openMenu() {
    expanded = true;

    await tick();

    // Focus on first button in menu container
    (menuContainer.querySelector(".menu-button") as HTMLButtonElement).focus();

    return setupWindowListener();
  }

  function closeMenu() {
    expanded = false;

    // Focus on menu toggle
    menuToggle.focus();

    return clearWindowListener();
  }

  function handleToggleKeydown(e) {
    const key: string = e.key;

    switch (key) {
      case "Enter":
      case " ":
      case "ArrowDown":
        e.preventDefault();
        return openMenu();
      case "ArrowUp":
        e.preventDefault();
        return closeMenu();
    }
  }

  function handleMenuKeydown(e) {
    const key: string = e.key;

    const activeElement = document.activeElement;
    let target: HTMLButtonElement;

    switch (key) {
      case "ArrowUp":
        e.preventDefault();
        // Focus on previous button element, or wrap
        target = activeElement.previousElementSibling as HTMLButtonElement;
        if (!target)
          target = menuContainer.lastElementChild as HTMLButtonElement;
        target.focus();
        return;
      case "ArrowDown":
        e.preventDefault();
        // Focus on next button element, or wrap
        target = activeElement.nextElementSibling as HTMLButtonElement;
        if (!target)
          target = menuContainer.firstElementChild as HTMLButtonElement;
        target.focus();
        return;
      case "Escape":
        e.preventDefault();
        return closeMenu();
      case "Tab":
        // Focus will be out of menu. Close, but don't focus the button.
        expanded = false;
        return clearWindowListener();
    }
  }

  function selectAction(actionId: string) {
    dispatch("actionClicked", actionId);
  }

  function setupWindowListener() {
    // Setup a listener to close the menu if the user clicks somewhere outside
    // of this component.
    if (!window) return;

    windowListener = (e) => {
      if (menuContainer && menuContainer.parentElement.contains(e.target))
        return;
      expanded = false;
      clearWindowListener();
    };

    window.addEventListener("click", windowListener);
  }

  function clearWindowListener() {
    if (!window || !windowListener) return;

    window.removeEventListener("click", windowListener);
    windowListener = undefined;
  }
</script>

<div class="relative w-max">
  <MenuToggle
    bind:this={menuToggle}
    on:click={toggleMenu}
    on:keydown={handleToggleKeydown}
    textAlternative={openButtonText}
    ariaExpanded={expanded}
    ariaHasPopup={true}
  />

  {#if expanded}
    <div
      bind:this={menuContainer}
      on:keydown={handleMenuKeydown}
      transition:slide={{ duration: checkReducedMotion(150, 0) }}
      role="menu"
      class:menu-container={true}
      class="p-4 rounded-lg flex flex-col gap-4 bg-white dark:bg-gray-very-dark"
      data-align={alignMenu}
    >
      {#each actions as action}
        <button
          on:click|preventDefault={() => selectAction(action.id)}
          tabindex="-1"
          class:menu-button={true}
          class={labelStyles[action.style || "normal"]}
          ><Text element="span">{action.label}</Text></button
        >
      {/each}
    </div>
  {/if}
</div>

<style lang="postcss">
  .menu-container {
    position: absolute;
    top: calc(100% + 1.375rem);

    min-width: 12rem;
    box-shadow: 0 0.625rem 0.375rem hsl(217 36% 33% / 0.115);
  }

  .menu-container[data-align="start"] {
    left: 0;
  }

  .menu-container[data-align="center"] {
    left: 50%;
    transform: translateX(-50%);
  }

  .menu-container[data-align="end"] {
    right: 0;
  }

  .menu-button {
    display: flex;
    align-items: center;
    border-radius: 0.25rem;
  }

  .menu-button::before {
    content: "";

    display: block;

    width: 0.5rem;
    aspect-ratio: 1;
    background-color: currentColor;
    border-radius: 1rem;

    opacity: 0;
  }

  .menu-button > :global(span) {
    transform: translateX(-0.5rem);
  }

  .menu-button:focus-visible {
    outline: 1px solid currentColor;
    outline-offset: 0.25rem;
  }

  .menu-button:is(:hover, :focus-visible)::before {
    opacity: 1;
  }

  .menu-button:is(:hover, :focus-visible) > :global(span) {
    transform: translateX(0.5rem);
  }

  @media (prefers-reduced-motion: no-preference) {
    .menu-button > :global(span) {
      transition: transform 150ms ease-in-out;
    }

    .menu-button:is(:hover, :focus-visible)::before {
      transition: opacity 150ms ease-in-out;
    }
  }
</style>
