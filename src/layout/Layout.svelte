<script lang="ts">
  import { link, active } from '../router'
  import rootNavigator from '../routes'
  import authNavigator from '../auth/routes'

  import { Drawer, Item, Stacked } from '../components'
  import Header from './Header.svelte'
  import AuthenticatedGuard from '../auth/guards/AuthenticatedGuard.svelte'
  import AnonymousGuard from '../auth/guards/AnonymousGuard.svelte'
  import { userNavigator } from '../navigators'
  import AdminGuard from '../auth/guards/AdminGuard.svelte'

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
    <a
      href={rootNavigator.routes.home}
      use:link
      use:active
      data-when={rootNavigator.routes.home}
      data-exact
    >
      Home
    </a>
  </Item>
  <AuthenticatedGuard displayNotAllowed={false}>
    <Item on:click={toggleDrawer}>
      <a
        href={authNavigator.routes.editCurrentUser}
        use:link
        use:active
        data-when={authNavigator.routes.editCurrentUser}
      >
        My data
      </a>
    </Item>
  </AuthenticatedGuard>
  <AnonymousGuard displayNotAllowed={false}>
    <Item on:click={toggleDrawer}>
      <a
        href={authNavigator.routes.signup}
        use:link
        use:active
        data-when={authNavigator.routes.signup}
      >
        Sign-up
      </a>
    </Item>
  </AnonymousGuard>
  <AdminGuard displayNotAllowed={false}>
    <Item on:click{toggleDrawer}>
      <a
        href={userNavigator.routes.usersList}
        use:link
        use:active
        data-when={userNavigator.routes.usersList}
      >
        Users List
      </a>
    </Item>
  </AdminGuard>
  <Item on:click={toggleDrawer}>
    <a
      href={rootNavigator.routes.about}
      use:link
      use:active
      data-when={rootNavigator.routes.about}
    >
      About us
    </a>
  </Item>
  <Item on:click={toggleDrawer}>
    <a
      href={rootNavigator.routes.contact}
      use:link
      use:active
      data-when={rootNavigator.routes.contact}
    >
      Contact us
    </a>
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
