<script lang="ts">
  import { fade, fly } from 'svelte/transition'

  const fadeOptions = { duration: 300 }

  export let fixed = false
  export let open = true
  export let overlay = true
  export let width = 250
  export let top = 0

  $: style = `width: ${width}px; top: ${top}`
  $: flyOptions = { duration: 300, x: width * -1, y: 0 }

  function handleOverlayClick() {
    open = !open
  }
</script>

{#if open || fixed}
  <nav class="drawer" {style} transition:fly={flyOptions}>
    <slot />
  </nav>
  {#if overlay && !fixed}
    <div
      class="overlay"
      on:click={handleOverlayClick}
      transition:fade={fadeOptions}
    />
  {/if}
{/if}

<style>
  .overlay {
    z-index: var(--overlay-index);
    background-color: #00000055;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .drawer {
    z-index: var(--drawer-index);
    display: flex;
    flex-direction: column;
    background-color: white;
    border-right: var(--divider);
    position: fixed;
    left: 0;
    bottom: 0;
  }
</style>
