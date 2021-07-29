<script lang="ts">
  import { Drawer, Item, Stacked } from '../components'
  import Header from './Header.svelte'

  let drawerOpened = false
</script>

<Header bind:navOpened={drawerOpened} />
<Drawer bind:open={drawerOpened}>
  <Item active={true}>Home</Item>
  <Item>About us</Item>
  <Item>Contact us</Item>
</Drawer>
<main>
  <Stacked width="100%" horizontal="center"><slot /></Stacked>
</main>
