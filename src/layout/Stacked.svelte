<script lang="ts">
  type HorizontalAlignment = 'left' | 'center' | 'right'
  type VerticalAlignment = 'top' | 'middle' | 'bottom'

  export let width: number
  export let height: number
  export let horizontal: HorizontalAlignment = 'left'
  export let vertical: VerticalAlignment = 'top'

  $: top = vertical === 'top'
  $: middle = vertical === 'middle'
  $: bottom = vertical === 'bottom'
  $: left = horizontal === 'left'
  $: center = horizontal === 'center'
  $: right = horizontal === 'right'
  $: style = `width: ${width}px; height: ${height}px`
</script>

<div
  class="stacked"
  class:left
  class:center
  class:right
  class:top
  class:middle
  class:bottom
  {style}
>
  <slot />
</div>

<style>
  .stacked {
    position: relative;
    display: flex;
  }

  .stacked.middle {
    align-items: center;
  }

  .stacked.bottom {
    align-items: flex-end;
  }

  .stacked.left {
    justify-content: flex-start;
  }

  .stacked.center {
    justify-content: center;
  }

  .stacked.right {
    justify-content: flex-end;
  }

  .stacked > :global(*) {
    position: absolute;
  }
</style>
