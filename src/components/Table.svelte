<script lang="ts">
  export let data: any[]
  export let headers: string[] = []
  export let itemKey: (item: any, index: number) => any = (item, i) => i
</script>

<table>
  {#if $$slots.head}
    <thead><slot name="head" /></thead>
  {:else if headers.length > 0}
    <thead>
      <tr>
        {#each headers as header}
          <th>{header}</th>
        {/each}
      </tr>
    </thead>
  {/if}

  <tbody>
    {#each data as item, i (itemKey(item, i))}
      <tr>
        <slot {item} />
      </tr>
    {/each}
  </tbody>

  {#if $$slots.footer}
    <tfoot><slot name="footer" /></tfoot>
  {/if}
</table>
