<script lang="ts">
  import type { IconColor } from './color'

  export let color: IconColor = 'primary'

  $: clazz = `icon ${color}`
</script>

<div class={clazz}><slot /></div>

<style>
  .icon {
    height: 24px;
  }

  :global(.button-icon.button-clear) > .icon > :global(svg),
  :global(.button-icon.button-outline) > .icon > :global(svg),
  .icon.primary > :global(svg) {
    fill: var(--primary-color);
  }

  :global(.button-icon) > .icon > :global(svg),
  .icon.light > :global(svg) {
    fill: white;
  }
</style>
