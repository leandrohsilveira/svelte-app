<script lang="ts">
  import { createEventDispatcher } from 'svelte'

  export let active = false

  const dispatcher = createEventDispatcher<{ click: {} }>()
  function handleClick() {
    dispatcher('click', {})
  }
</script>

<div class="item" class:active on:click|capture={handleClick}>
  <slot />
</div>

<style>
  .item:hover,
  .item.active {
    background-color: #e4e5e6;
  }

  .item:not(:last-child) {
    border-bottom: var(--divider);
  }

  .item > :global(*) {
    padding: 5px 20px;
    display: block;
    width: 100%;
    height: max-content;
  }
</style>
