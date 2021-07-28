<script lang="ts">
  import Field from './Field.svelte'

  export let placeholder: string
  export let errors: string[]
  export let touched: boolean
</script>

<Field bind:errors bind:touched>
  <input name="test" {placeholder} />
</Field>
<span data-testid="touched">{touched}</span>
