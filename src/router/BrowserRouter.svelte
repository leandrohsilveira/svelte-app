<script lang="ts">
  import { onMount } from 'svelte'

  import { setup, synchronizeStoreAndHistory } from './store'

  setup()

  onMount(() => synchronizeStoreAndHistory())
</script>

<slot />
