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

  .icon.primary > :global(svg) {
    fill: var(--primary-color);
  }

  .icon.light > :global(svg) {
    fill: white;
  }
</style>
