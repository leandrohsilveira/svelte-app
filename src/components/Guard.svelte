<script lang="ts">
  export let allowed: boolean
  export let displayNotAllowed = true
</script>

{#if allowed}
  <slot />
{:else if displayNotAllowed}
  <slot name="forbidden" />
{/if}
