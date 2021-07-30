<script lang="ts">
  import Item from './Item.svelte'

  let clickCaptured = false

  function handleClick() {
    clickCaptured = true
  }
</script>

<Item on:click={handleClick}><button>Button</button></Item>
<span data-testid="click-captured">{clickCaptured}</span>
