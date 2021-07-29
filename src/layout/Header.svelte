<script lang="ts">
  import { LoginToolbar } from '../auth'
</script>

<nav>
  <h4>App</h4>
  <LoginToolbar />
</nav>

<style>
  nav {
    padding: 10px;
    margin: 0;
    height: 90px;
    background-color: #f4f5f6;
    border-bottom: 0.1rem solid #d1d1d1;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  nav > h4 {
    margin-bottom: 0;
    padding-bottom: 0;
  }
</style>
