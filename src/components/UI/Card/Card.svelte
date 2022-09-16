<script context="module" lang="ts">
  // Allowable card elements
  type CardElement = "div" | "section";

  // Allowable border radii (in pixels)
  type CardBorderRadius = 6 | 8;

  // Allowable card paddings (in pixels)
  type CardPadding = 16 | 23 | 32 | 40;

  // Allowable padding configurations (follows standard CSS padding syntax)
  type CardPaddingDef =
    | CardPadding
    | [CardPadding]
    | [CardPadding, CardPadding]
    | [CardPadding, CardPadding, CardPadding]
    | [CardPadding, CardPadding, CardPadding, CardPadding];

  // Optional min-height of card (no given units)
  type CardMinHeight = "auto" | number;
</script>

<script lang="ts">
  export let element: CardElement = "div";
  export let borderRadius: CardBorderRadius = 6;
  export let minHeight: CardMinHeight = "auto";
  export let padding: CardPaddingDef = 16;
  export let shadow: boolean = false;
  export let classes: string = "";

  let paddingVar = [padding]
    .flat()
    .map((el) => el / 16)
    .reduce((acc, el) => acc + " " + el + "rem", "");

  let classList = "bg-white dark:bg-gray-dark";
  if (classes) classList += " " + classes;
</script>

<svelte:element
  this={element}
  style:--card-padding={paddingVar}
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
    padding: var(--card-padding, 1rem);
    min-height: var(--card-min-height, "auto");
  }

  .card-shadow {
    box-shadow: 0 0.25rem 0.375rem hsl(217 36% 33% / 0.115);
  }
</style>
