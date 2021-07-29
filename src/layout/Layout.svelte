<script lang="ts">
  import { Link } from 'svelte-routing'
  import { Drawer, Item, Stacked } from '../components'
  import Header from './Header.svelte'

  let drawerOpened = false

  function toggleDrawer() {
    drawerOpened = !drawerOpened
  }
</script>

<Header bind:navOpened={drawerOpened} />
<Drawer bind:open={drawerOpened}>
  <Item on:click={toggleDrawer}><Link to="/">Home</Link></Item>
  <Item on:click={toggleDrawer}><Link to="/about">About us</Link></Item>
  <Item on:click={toggleDrawer}><Link to="/contact">Contact us</Link></Item>
</Drawer>
<main>
  <Stacked width="100%" horizontal="center"><slot /></Stacked>
</main>
