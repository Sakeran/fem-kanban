<script context="module" lang="ts">
  const styles = {
    XL: "font-bold leading-15/12 text-24p",
    L: "font-bold leading-23/18 text-18p",
    M: "font-bold leading-19/15 text-15p",
    S: "font-bold leading-15/12 text-12p tracking-24p",
  };
</script>

<script lang="ts">
  export let element: "h1" | "h2" | "h3" | "h4" | "span" | "p" = "h1";
  export let style: "XL" | "L" | "M" | "S" = "XL";
  export let classes: string = "";

  export let id: string = "";

  let classList = styles[style];
  if (classes) classList += " " + classes;
</script>

<svelte:element this={element} id={id || null} class={classList}
  ><slot /></svelte:element
>
