<script context="module" lang="ts">
  const styles = {
    PrimaryL:
      "font-bold text-15p leading-19/15 bg-main-purple-normal hocus:bg-main-purple-hover text-white outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover min-h-button-l inline-grid text-center place-items-center rounded-full px-15.5 motion-safe:transition-colors motion-safe:ease-in-out",
    PrimaryS:
      "font-bold text-13p leading-23/13 bg-main-purple-normal hocus:bg-main-purple-hover text-white outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover min-h-button-s inline-grid text-center place-items-center rounded-full px-15.5 motion-safe:transition-colors motion-safe:ease-in-out",
    Secondary:
      "font-bold text-13p leading-23/13 bg-main-purple-normal/10 hocus:bg-main-purple-hover/25 dark:bg-white text-main-purple-normal outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover dark:focus-visible:outline-white min-h-button-s inline-grid text-center place-items-center rounded-full px-15.5 motion-safe:transition-colors motion-safe:ease-in-out",
    Destructive:
      "font-bold text-13p leading-23/13 bg-red-normal hocus:bg-red-hover text-white outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-red-hover min-h-button-s inline-grid text-center place-items-center rounded-full px-15.5 motion-safe:transition-colors motion-safe:ease-in-out",
    PrimaryNarrow:
      "font-bold text-15p leading-19/15 bg-main-purple-normal hocus:bg-main-purple-hover text-white outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover min-h-button-l inline-grid text-center place-items-center rounded-full px-6 motion-safe:transition-colors motion-safe:ease-in-out",
  };
</script>

<script lang="ts">
  export let style:
    | "PrimaryL"
    | "PrimaryS"
    | "Secondary"
    | "Destructive"
    | "PrimaryNarrow" = "PrimaryL";
  export let element: "a" | "button" = "button";
  export let href: string = "";
  export let classes: string = "";

  let classList = styles[style];
  if (classes) classList += " " + classes;
</script>

<svelte:element
  this={element}
  on:click
  href={element !== "a" ? null : href || "#"}
  class={classList}><slot /></svelte:element
>
