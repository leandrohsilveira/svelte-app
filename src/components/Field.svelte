<script lang="ts">
  export let label: string = undefined
  export let name = label
  export let touched = false
  export let errors: string[] = []

  $: error = touched && (errors?.length ?? 0) > 0
  $: errorMessages = errors?.join(', ')

  function handleBlur() {
    touched = true
  }
</script>

<div class="field" class:error on:blur|capture={handleBlur}>
  {#if typeof label === 'string'}
    <label for={name}>{label}</label>
  {/if}
  <slot />
  {#if error}
    <small data-testid="error_msg" class="error msg">{errorMessages}</small>
  {/if}
</div>

<style>
  .field {
    display: flex;
    flex-direction: column;
  }

  .field:not(.error) {
    margin-bottom: var(--margin-bottom);
  }

  .field.error > label {
    color: red;
  }

  .field.error > :global(input),
  .field.error > :global(select),
  .field.error > :global(textarea) {
    color: red;
    border-color: red;
  }

  .field.error > .error.msg {
    color: red;
    margin: 5px;
  }
</style>
