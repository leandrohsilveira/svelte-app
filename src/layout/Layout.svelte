<script lang="ts">
  import Drawer from './Drawer.svelte'
  import Header from './Header.svelte'

  let drawerOpened = false
</script>

<Header bind:navOpened={drawerOpened} />
<Drawer bind:open={drawerOpened} />
<main />
