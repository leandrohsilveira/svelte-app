<script lang="ts">
  import { fade, fly } from 'svelte/transition'

  const fadeOptions = { duration: 300 }

  export let open = true
  export let width = 250

  $: style = `width: ${width}px`
  $: flyOptions = { duration: 300, x: width * -1, y: 0 }

  function handleOverlayClick() {
    open = !open
  }
</script>

{#if open}
  <nav class="drawer" {style} transition:fly={flyOptions}>
    <div class="item active">Home</div>
    <div class="item">About us</div>
    <div class="item">Contact us</div>
  </nav>
  <div
    class="overlay"
    on:click={handleOverlayClick}
    transition:fade={fadeOptions}
  />
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
    background-color: var(--tool-color);
    border-right: var(--divider);
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
  }

  .drawer > .item {
    padding: 5px 20px;
  }

  .drawer > .item:hover,
  .drawer > .item.active {
    background-color: #e4e5e6;
  }

  .drawer > .item:not(:last-child) {
    border-bottom: var(--divider);
  }
</style>
