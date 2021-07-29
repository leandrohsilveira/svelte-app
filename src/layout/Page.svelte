<script lang="ts">
  export let title: string

  $: document.title = `App - ${title}`
</script>

<section>
  <header><h2>{title}</h2></header>
  <article><slot /></article>
</section>

<style>
  section {
    margin: 20px 0;
    display: flex;
    width: 768px;
    flex-direction: column;
    justify-self: center;
  }

  section > header {
    border-bottom: var(--divider);
  }

  section > article {
    margin: 10px 0;
  }
</style>
