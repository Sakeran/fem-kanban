<script context="module" lang="ts">
  const styles = {
    PrimaryL:
      "font-bold text-15p leading-19/15 bg-main-purple-normal enabled:hocus:bg-main-purple-hover text-white outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover min-h-button-l inline-grid text-center place-items-center rounded-full px-15.5 motion-safe:transition-colors motion-safe:ease-in-out disabled:opacity-50",
    PrimaryS:
      "font-bold text-13p leading-23/13 bg-main-purple-normal enabled:hocus:bg-main-purple-hover text-white outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover min-h-button-s inline-grid text-center place-items-center rounded-full px-15.5 motion-safe:transition-colors motion-safe:ease-in-out disabled:opacity-50",
    Secondary:
      "font-bold text-13p leading-23/13 bg-main-purple-normal/10 enabled:hocus:bg-main-purple-hover/25 dark:bg-white text-main-purple-normal outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover dark:focus-visible:outline-white min-h-button-s inline-grid text-center place-items-center rounded-full px-15.5 motion-safe:transition-colors motion-safe:ease-in-out disabled:opacity-50",
    Destructive:
      "font-bold text-13p leading-23/13 bg-red-normal enabled:hocus:bg-red-hover text-white outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-red-hover min-h-button-s inline-grid text-center place-items-center rounded-full px-15.5 motion-safe:transition-colors motion-safe:ease-in-out disabled:opacity-50",
    PrimaryNarrow:
      "font-bold text-15p leading-19/15 bg-main-purple-normal enabled:hocus:bg-main-purple-hover text-white outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover min-h-button-l inline-grid text-center place-items-center rounded-full px-6 motion-safe:transition-colors motion-safe:ease-in-out disabled:opacity-50",
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
  export let type: "submit" | "button" | "" = "";
  export let href: string = "";
  export let classes: string = "";
  export let disabled: boolean = false;

  let classList = styles[style];
  if (classes) classList += " " + classes;
</script>

<svelte:element
  this={element}
  on:click
  href={element !== "a" ? null : href || "#"}
  type={element !== "button" ? null : type || null}
  disabled={element !== "button" ? null : (disabled || null)}
  class={classList}><slot /></svelte:element
>
