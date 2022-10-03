<script context="module" lang="ts">
  // Allowable card elements
  type CardElement = "div" | "section";

  // Allowable border radii (in pixels)
  type CardBorderRadius = 6 | 8;

  // Optional min-height of card (no given units)
  type CardMinHeight = "auto" | number;

  // Allowable padding styles
  type CardPaddingStyle = keyof(typeof cardPaddingStyles);

  // Padding Styles
  export const cardPaddingStyles = {
    TodoCard: "py-5.75 px-4",
    Modal: "p-6 sm:p-8"
  }
</script>

<script lang="ts">
  export let element: CardElement = "div";
  export let borderRadius: CardBorderRadius = 6;
  export let paddingStyle: CardPaddingStyle = "TodoCard";
  export let minHeight: CardMinHeight = "auto";
  export let shadow: boolean = false;
  export let classes: string = "";

  let classList = "bg-white dark:bg-gray-dark";
  if (paddingStyle) classList += " " + cardPaddingStyles[paddingStyle];
  if (classes) classList += " " + classes;
</script>

<svelte:element
  this={element}
  style:--card-min-height={minHeight}
  class:card={true}
  class:card-shadow={shadow}
  class:rounded-sm={borderRadius === 6}
  class:rounded-lg={borderRadius === 8}
  class={classList}
>
  <slot />
</svelte:element>

<style lang="postcss">
  .card {
    min-height: var(--card-min-height, "auto");
  }

  .card-shadow {
    box-shadow: 0 0.25rem 0.375rem hsl(217 36% 33% / 0.115);
  }
</style>
