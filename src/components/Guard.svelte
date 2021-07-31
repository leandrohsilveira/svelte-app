<script lang="ts">
  export let allowed: boolean
</script>

{#if allowed}
  <slot />
{:else}
  <slot name="forbidden" />
{/if}