<script lang="ts">
  export let textAlternative: string;
</script>

<button
  on:click
  class="bg-main-purple-normal hocus:bg-main-purple-hover outline-2 focus-visible:outline outline-offset-4 focus-visible:outline-main-purple-hover min-h-[2rem] inline-grid text-center place-items-center rounded-full px-4.5 motion-safe:transition-colors motion-safe:ease-in-out"
>
  <span aria-hidden="true"><slot /></span>
  <span class="sr-only">{textAlternative}</span>
</button>
