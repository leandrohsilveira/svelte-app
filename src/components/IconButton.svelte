<script lang="ts">
  import type { IconColor } from './color'
  import Icon from './Icon.svelte'

  type ButtonColor = 'default' | 'outline' | 'clear'

  export let color: ButtonColor = 'default'

  $: iconColor = determineIconColor(color)
  $: buttonClass = `button button-${color}`

  function determineIconColor(buttonColor: ButtonColor): IconColor {
    switch (buttonColor) {
      case 'outline':
      case 'clear':
        return 'primary'
      case 'default':
      default:
        return 'light'
    }
  }
</script>

<button {...$$restProps} class={buttonClass}>
  <Icon color={iconColor}><slot /></Icon>
</button>

<style>
  button {
    padding: 0 1rem;
  }
</style>
