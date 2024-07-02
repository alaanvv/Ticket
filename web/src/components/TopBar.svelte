<div class='bar row'>
  <h2> iTicket </h2>

  {#if $logged_user}
    <div class='row'>
      <p> {$logged_user.name} </p>
      <Icon on:click={logout} i='logout' />
    </div>
  {/if}
</div>

<script>
  import Icon from '../components/Icon.svelte'

  import { logged_user } from '../store.js'

  function logout() {
    // TODO Delete the session itself
    localStorage.removeItem('session_id')
    logged_user.set(undefined)
  }
</script>

<style>
  .bar {
    flex-basis: 0;

    margin: 0 0 10px  0;
    padding: 10px 20px;

    background: var(--bg0);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);

    color: var(--fg0);
    user-select: none;
  }

  p {
    margin: 5px;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  :global(.row span) {
    cursor: pointer;
  }

  @media screen and (max-width: 768px) {
    .bar {
      margin: 0;
    }
  }
</style>
