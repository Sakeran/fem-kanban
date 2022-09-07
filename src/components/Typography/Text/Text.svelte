<script context="module" lang="ts">
  const styles = {
    L: "font-medium leading-23/13 text-13p",
    M: "font-bold leading-15/12 text-12p",
  };
</script>

<script lang="ts">
  export let element: "span" | "p" | "label" = "p";
  export let style: "M" | "L" = "L";
  export let classes: string = "";

  let classList = styles[style];
  if (classes) classList += " " + classes;
</script>

<svelte:element this={element} class={classList}><slot /></svelte:element>
