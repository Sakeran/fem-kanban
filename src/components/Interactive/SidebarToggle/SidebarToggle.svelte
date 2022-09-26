<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Heading from "../../Typography/Heading/Heading.svelte";

  export let sidebarExpanded: boolean = false;

  const dispatch = createEventDispatcher();

  function handleToggleSidebar() {
    sidebarExpanded = !sidebarExpanded;

    dispatch("toggle", sidebarExpanded);
  }
</script>

<div
  data-sidebar-expanded={sidebarExpanded}
  class="relative overflow-hidden text-gray-medium hover:text-main-purple-normal focus-within:text-main-purple-normal"
>
  <button
    class="w-full flex items-center min-h-button-l pl-[3.25rem] lg:pl-16 rounded-tr-full rounded-br-full bg-transparent hocus:text-main-purple-normal hocus:bg-main-purple-normal/10 dark:hocus:bg-white text-gray-medium motion-safe:transition-all motion-safe:ease-in-out"
    on:click={() => handleToggleSidebar()}
  >
    <Heading element="span" style="M"
      >{sidebarExpanded ? "Hide" : "Show"} Sidebar</Heading
    >
  </button>

  <!-- Icons  -->
  <div
    class="icon-container absolute top-0 bottom-0 left-6 lg:left-8 flex items-center pointer-events-none"
  >
    <!-- (Sidebar Expanded)  -->
    <div class="motion-safe:transition-opacity motion-safe:ease-in-out">
      <svg
        width="18"
        height="16"
        viewBox="0 0 18 16"
        aria-hidden="true"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M17.7923 8.76153C16.7538 10.5238 15.1854 11.941 13.3062 12.8081L14.8099 14.9563C14.9286 15.1259 14.8874 15.3598 14.7177 15.4785L14.0697 15.9322C13.9 16.051 13.6662 16.0097 13.5474 15.84L3.19013 1.04373C3.07135 0.874074 3.11263 0.64023 3.28229 0.521481L3.93032 0.067825C4.09998 -0.050956 4.33382 -0.00967486 4.45257 0.159981L6.18775 2.63888C7.08163 2.38573 8.02525 2.25001 9 2.25001C12.7456 2.25001 16.0311 4.24982 17.7923 7.23847C18.0692 7.7084 18.0692 8.2916 17.7923 8.76153ZM1.50001 8C2.99714 10.5406 5.79513 12.25 9 12.25C9.07946 12.2499 9.15892 12.2487 9.23834 12.2465L10.239 13.676C9.82784 13.7253 9.4141 13.75 9 13.75C5.25438 13.75 1.96889 11.7502 0.207702 8.76156C-0.069234 8.29163 -0.069234 7.7084 0.207702 7.23847C0.997544 5.89816 2.09379 4.75732 3.4001 3.90623L4.26076 5.13569C3.12813 5.86432 2.17986 6.84635 1.50001 8ZM8.52194 11.2231C6.00685 10.9415 4.26532 8.50791 4.86788 6.00303L8.52194 11.2231ZM9.74494 3.78104C12.6351 4.02282 15.1201 5.65835 16.5 8C15.5721 9.57456 14.1446 10.8297 12.4302 11.5566L11.596 10.3649C13.2731 9.06931 13.7072 6.7886 12.75 4.99869L12.75 5C12.75 5.9665 11.9665 6.75 11 6.75C10.0335 6.75 9.25 5.9665 9.25 5C9.25 4.52594 9.43881 4.09619 9.74494 3.78104Z"
          fill="currentColor"
        />
      </svg>
    </div>

    <!-- (Sidebar Collapsed)  -->
    <div
      class="-translate-x-[0.375rem] lg:-translate-x-[0.8125rem] motion-safe:transition-opacity motion-safe:ease-in-out"
    >
      <svg
        width="16"
        height="11"
        viewBox="0 0 16 11"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M15.8154 4.43419C14.2491 1.77636 11.328 0 8 0C4.67056 0 1.75012 1.77761 0.184624 4.43419C-0.0615413 4.8519 -0.0615413 5.37033 0.184624 5.78805C1.75087 8.44585 4.67195 10.2222 8 10.2222C11.3294 10.2222 14.2499 8.4446 15.8154 5.78802C16.0615 5.37031 16.0615 4.85189 15.8154 4.43419ZM8 8.88887C5.91217 8.88887 4.22223 7.19924 4.22223 5.1111C4.22223 3.02327 5.91184 1.33333 8 1.33333C10.0878 1.33333 11.7778 3.02294 11.7778 5.1111C11.7778 7.19893 10.0882 8.88887 8 8.88887ZM8 7.99999C9.5955 7.99999 10.8889 6.7066 10.8889 5.1111C10.8889 3.51561 9.5955 2.22222 8 2.22222C7.50811 2.22222 7.04503 2.3453 6.63964 2.56211L6.64053 2.56208C7.2975 2.56208 7.83008 3.09466 7.83008 3.75163C7.83008 4.40858 7.2975 4.94116 6.64053 4.94116C5.98356 4.94116 5.45098 4.4086 5.45098 3.75163L5.451 3.75074C5.2342 4.15613 5.11112 4.61921 5.11112 5.1111C5.11112 6.7066 6.4045 7.99999 8 7.99999Z"
          fill="white"
        />
      </svg>
    </div>
  </div>
</div>

<style lang="postcss">
  /* Button (Custom Outline & Translation Effect) */
  button:focus-visible {
    @apply outline-none;
  }

  button:focus-visible:before {
    @apply absolute top-2 right-2 bottom-2 left-0 outline outline-2 outline-main-purple-normal rounded-tr-full rounded-br-full;
    content: "";
  }

  [data-sidebar-expanded="false"] button:focus-visible:before {
    @apply outline-white;
  }

  [data-sidebar-expanded="false"] button {
    @apply bg-main-purple-normal text-transparent;

    transform: translateX(calc(-100% + 3.5rem));
  }

  /* Icons (Placement & Opacity Effects)*/
  .icon-container {
    display: grid;
    place-items: center;
  }

  .icon-container > div {
    opacity: 0;

    grid-area: 1 / 1 / span 1 / span 1;
  }

  [data-sidebar-expanded="true"] .icon-container > div:first-of-type {
    opacity: 1;
  }

  [data-sidebar-expanded="false"] .icon-container > div:nth-of-type(2) {
    opacity: 1;
  }
</style>
