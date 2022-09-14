<script lang="ts">
  export let textAlternative: string;
</script>

<button
  class="text-gray-medium hocus:text-black dark:hocus:text-white focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline focus-visible:outline-current min-w-[1.25rem] aspect-square flex justify-center motion-safe:transition-colors motion-safe:ease-in-out"
  on:click
  ><svg
    width="0.31rem"
    height="1.25rem"
    viewBox="0 0 5 20"
    aria-hidden="true"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="2.30769" cy="2.30769" r="2.30769" fill="currentColor" />
    <circle cx="2.30769" cy="10" r="2.30769" fill="currentColor" />
    <circle cx="2.30769" cy="17.6923" r="2.30769" fill="currentColor" />
  </svg>
  <span class="sr-only">{textAlternative}</span>
</button>
