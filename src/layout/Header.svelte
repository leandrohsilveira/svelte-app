<script lang="ts">
  import { AuthToolbar } from '../auth'
  import { Icon } from '../components'
  import { Menu } from '../icons'

  export let navOpened = false

  function handleToggleNavClick() {
    navOpened = !navOpened
  }
</script>

<header>
  <div class="title">
    <button
      class="button button-clear button-icon"
      disabled={navOpened}
      on:click={handleToggleNavClick}
    >
      <Icon><Menu /></Icon>
    </button>
    <h4>App</h4>
  </div>
  <AuthToolbar />
</header>

<style>
  header {
    padding: 10px;
    margin: 0;
    height: 90px;
    background-color: var(--tool-color);
    border-bottom: var(--divider);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  header > .title > h4 {
    margin-bottom: 0;
    padding-bottom: 0;
  }

  header > .title {
    display: flex;
    align-items: center;
  }
</style>
