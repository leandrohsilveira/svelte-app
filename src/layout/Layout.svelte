<script lang="ts">
  import { link, active } from '../router'
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
  <Item on:click={toggleDrawer}>
    <a href="/" use:link use:active data-when="/" data-exact>Home</a>
  </Item>
  {#if $isAuthenticated}
    <Item on:click={toggleDrawer}>
      <a href="/auth/user/edit" use:link use:active data-when="/auth/user/edit">
        My data
      </a>
    </Item>
  {:else}
    <Item on:click={toggleDrawer}>
      <a href="/signup" use:link use:active data-when="/signup">Sign-up</a>
    </Item>
  {/if}
  <Item on:click={toggleDrawer}>
    <a href="/about" use:link use:active data-when="/about">About us</a>
  </Item>
  <Item on:click={toggleDrawer}>
    <a href="/contact" use:link use:active data-when="/contact">Contact us</a>
  </Item>
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

  :global(a.active) {
    background-color: var(--tool-color);
  }

  main.fixed {
    margin-left: 250px;
  }
</style>
