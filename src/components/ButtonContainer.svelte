<div class="button-container">
  <slot />
</div>

<style>
  .button-container {
    display: flex;
    flex-direction: row-reverse;
    border-top: var(--divider);
    padding: 10px 0;
  }

  .button-container > :global(*):not(:last-child) {
    margin-left: 5px;
  }
</style>
