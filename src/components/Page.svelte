<script lang="ts">
  import { fade } from 'svelte/transition'

  const fadeOptions = { delay: 100, duration: 350 }

  export let title: string
  export let hideHeader = false

  $: document.title = `App - ${title}`
</script>

<section transition:fade={fadeOptions}>
  <header class:hideHeader>
    <h2>{title}</h2>
  </header>
  <article>
    <slot />
  </article>
</section>

<style>
  section {
    margin: 20px 0;
    display: flex;
    width: 768px;
    flex-direction: column;
    justify-self: center;
  }

  @media screen and (max-width: 1068px) {
    section {
      width: 90%;
    }
  }

  section > header {
    border-bottom: var(--divider);
  }

  section > header.hideHeader {
    display: none;
  }

  section > article {
    margin: 10px 0;
  }
</style>
