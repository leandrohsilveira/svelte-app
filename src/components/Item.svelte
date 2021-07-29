
<script lang="ts">
  export let active = false
</script>

<div class="item" class:active>
  <slot />
</div>

<style>
  .item {
    padding: 5px 20px;
  }

  .item:hover,
  .item.active {
    background-color: #e4e5e6;
  }

  .item:not(:last-child) {
    border-bottom: var(--divider);
  }
</style>