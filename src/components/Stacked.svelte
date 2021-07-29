<script lang="ts">
  type HorizontalAlignment = 'left' | 'center' | 'right'
  type VerticalAlignment = 'top' | 'middle' | 'bottom'

  export let width: string
  export let height: string = undefined
  export let horizontal: HorizontalAlignment = 'left'
  export let vertical: VerticalAlignment = 'top'

  $: top = vertical === 'top'
  $: middle = vertical === 'middle'
  $: bottom = vertical === 'bottom'
  $: left = horizontal === 'left'
  $: center = horizontal === 'center'
  $: right = horizontal === 'right'
  $: style = computeStyle(width, height)

  function computeStyle(width: string, height?: string) {
    return [`width: ${width}`, height !== undefined && `height: ${height}`]
      .filter((style) => style)
      .join('; ')
  }
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
