<script lang="ts">
  import { fade, fly } from 'svelte/transition'
  import { cubicInOut } from 'svelte/easing'

  type SlidePosition = 'left' | 'right' | 'top' | 'bottom'

  const fadeOptions = { duration: 300 }

  export let position: SlidePosition
  export let size: number
  export let open = false
  export let overlay = true

  let outerWidth: number
  let outerHeight: number

  $: sliderClass = `slider ${position}`
  $: style = computeStyle(position, size, outerWidth, outerHeight)
  $: flyOptions = computeFlyOptions(position, size, outerWidth, outerHeight)

  function handleOverlayClick() {
    open = !open
  }

  function computeFlyOptions(
    pos: SlidePosition,
    size: number,
    winWidth: number,
    winHeight: number
  ) {
    const duration = 300
    switch (pos) {
      case 'top':
        return { duration, easing: cubicInOut, x: 0, y: size * -1 }
      case 'bottom':
        return { duration, easing: cubicInOut, x: 0, y: winHeight + size }
      case 'left':
        return { duration, easing: cubicInOut, x: size * -1, y: 0 }
      case 'right':
        return { duration, easing: cubicInOut, x: winWidth + size, y: 0 }
    }
  }

  function computeStyle(
    pos: SlidePosition,
    size: number,
    winWidth: number,
    winHeight: number
  ) {
    let attr: 'width' | 'height'
    let boundary: number

    switch (pos) {
      case 'top':
      case 'bottom':
        attr = 'height'
        boundary = winHeight
        break
      case 'left':
      case 'right':
      default:
        attr = 'width'
        boundary = winWidth
        break
    }

    if (size < boundary && size / boundary < 0.7) return `${attr}: ${size}px`
    else return `${attr}: 70%`
  }
</script>

<svelte:window bind:outerHeight bind:outerWidth />
{#if open}
  <div class={sliderClass} {style} transition:fly={flyOptions}>
    <slot />
  </div>
  {#if overlay}
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
  .slider {
    z-index: var(--slider-index);
    background-color: white;
    position: fixed;
    overflow-y: auto;
  }
  .slider.left {
    border-right: var(--divider);
    top: 0;
    left: 0;
    bottom: 0;
  }
  .slider.right {
    border-left: var(--divider);
    top: 0;
    right: 0;
    bottom: 0;
  }
  .slider.top {
    border-bottom: var(--divider);
    top: 0;
    left: 0;
    right: 0;
  }
  .slider.bottom {
    border-top: var(--divider);
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
