<script lang="ts">
  import Slider from './Slider.svelte'

  export let fixed = false
  export let open = true
  export let overlay = true
  export let width = 250
</script>

{#if fixed}
  <Slider open={true} overlay={false} size={width} position="bottom">
    <nav class="drawer">
      <slot />
    </nav>
  </Slider>
{:else}
  <Slider bind:open overlay={overlay && !fixed} size={width} position="bottom">
    <nav class="drawer">
      <slot />
    </nav>
  </Slider>
{/if}

<style>
  .drawer {
    display: flex;
    flex-direction: column;
  }
</style>
