<script lang="ts">
  export let touched = false;
  export let errors: string[] = [];

  $: error = touched && (errors?.length ?? 0) > 0;
  $: errorMessages = errors?.join(", ");

  function handleBlur() {
    touched = true;
  }
</script>

<div class="field" class:error on:blur|capture={handleBlur}>
  <slot />
  {#if error}
    <span class="error msg">{errorMessages}</span>
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
  }

  .field > :global(input),
  .field > :global(select) {
    height: 40px;
    padding: 5px 10px;
  }

  .field.error > :global(input),
  .field.error > :global(select),
  .field.error > :global(textarea) {
    border-color: red;
  }

  .field.error > .error.msg {
    color: red;
    margin: 5px;
  }
</style>
