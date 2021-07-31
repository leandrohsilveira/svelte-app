<script lang="ts">
  import { Link } from 'svelte-routing'
  import { Drawer, Item, Stacked } from '../components'
  import { getInstance } from '../utils'
  import Header from './Header.svelte'

  const { isAuthenticated } = getInstance('authStore')

  let drawerOpened = false
  let innerWidth: number

  $: fixed = innerWidth > 768

  function toggleDrawer() {
    drawerOpened = !drawerOpened
  }
</script>

<svelte:window bind:innerWidth />
<Header bind:navOpened={drawerOpened} />
<Drawer bind:open={drawerOpened} {fixed}>
  <h4 class="logo">App</h4>
  <Item on:click={toggleDrawer}><Link to="/">Home</Link></Item>
  {#if $isAuthenticated}
    <Item on:click={toggleDrawer}>
      <Link to="/auth/user/edit">My data</Link>
    </Item>
  {:else}
    <Item on:click={toggleDrawer}><Link to="/signup">Sign-up</Link></Item>
  {/if}
  <Item on:click={toggleDrawer}><Link to="/about">About us</Link></Item>
  <Item on:click={toggleDrawer}><Link to="/contact">Contact us</Link></Item>
</Drawer>
<main class:fixed>
  <Stacked width="100%" horizontal="center"><slot /></Stacked>
</main>

<style>
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 90px;
    margin-bottom: 0px;
    background-color: var(--tool-color);
    border-bottom: var(--divider);
  }

  main.fixed {
    margin-left: 250px;
  }
</style>
