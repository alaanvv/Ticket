{#if $logged_user}
  <div class='usn tac sidebar'>
    {#if $logged_user.role == 'admin'}
      <h2> Admin </h2>

      <ul>
        <SidebarItem path='/usuarios' name='Usuários' i='group' />
        <SidebarItem path='/eventos'  name='Eventos'  i='event' />
      </ul>
    {/if}

    {#if ['admin', 'portaria'].includes($logged_user.role)}
      <h2> Portaria </h2>
      <ul>
        <SidebarItem path='/verificacao' name='Verificação' i='qr_code' />
        <SidebarItem path='/historico'   name='Histórico'   i='history' />
        <SidebarItem path='/teste'       name='Teste'       i='build' />
      </ul>
    {/if}
  </div>
{/if}

<script>
  import SidebarItem from '../components/SidebarItem.svelte'

  import { logged_user } from '../store.js'
</script>

<style>
  .sidebar {
    padding: 20px 30px;
  }

  ul {
    padding: 0;
    margin: 0;
    list-style: none;
  }

  ul :global(li) {
    padding: 10px 20px;
    border-radius: 5px;
    margin: 10px 0;

    cursor: pointer;
  }
  ul :global(li:hover) {
    background: var(--bg0);
  }
  ul :global(li.active) {
    background: var(--bg1);
    color: var(--fg1) !important;
  }

  @media screen and (max-width: 768px) {
    .sidebar {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;

      width: 100%;
      margin-bottom: 10px;

      overflow-x: scroll;
    }

    .sidebar h2 {
      display: none;
    }

    .sidebar ul {
      display: flex;
      flex-direction: row;
      gap: 10px
    }

    .sidebar :global(li) {
      margin: 0;
    }
  }
</style>
