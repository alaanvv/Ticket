<div class='bar row usn'>
  <h2> iTicket </h2>

  {#if $logged_user}
    <div class='row right'>
      {$logged_user.name}
      <Icon class='cp' on:click={logout} i='logout' />
    </div>
  {/if}
</div>

<script>
  import Icon from '../components/Icon.svelte'

  import { logged_user } from '../store.js'
  import { api } from '../utils/api.js'

  async function logout() {
    await api(`session/${localStorage.getItem('session_id')}`, 'DELETE')

    localStorage.removeItem('session_id')
    logged_user.set(undefined)
  }
</script>

<style>
  .bar {
    padding: 20px 20px;

    background: var(--bg0);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  }
</style>
