<script lang="ts">
  import { Stacked } from '../components'
  import Drawer from './Drawer.svelte'
  import Header from './Header.svelte'

  let drawerOpened = false
</script>

<Header bind:navOpened={drawerOpened} />
<Drawer bind:open={drawerOpened} />
<main>
  <Stacked width="100%" horizontal="center"><slot /></Stacked>
</main>
