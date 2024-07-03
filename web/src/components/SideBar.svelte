{#if $logged_user}
  <div class='col sidebar'>
    {#if $logged_user.role == 'admin'}
      <h2> Admin </h2>

      <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li> <p class:active={$curr_path == '/dashboard'} on:click={_ => navigate('/dashboard')}> <Icon i='dashboard' /> Dashboard </p> </li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li> <p class:active={$curr_path == '/usuarios'}  on:click={_ => navigate('/usuarios')}>  <Icon i='group' />     Usuários  </p> </li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li> <p class:active={$curr_path == '/eventos'}   on:click={_ => navigate('/eventos')}>   <Icon i='event' />     Eventos   </p> </li>
      </ul>
    {/if}

    {#if ['admin', 'portaria'].includes($logged_user.role)}
      <h2> Portaria </h2>
      <ul>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li> <p class:active={$curr_path == '/verificacao'} on:click={_ => navigate('/verificacao')}> <Icon i='qr_code' /> Verificação </p> </li>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <li> <p class:active={$curr_path == '/teste'}       on:click={_ => navigate('/teste')}>       <Icon i='build' />   Teste       </p> </li>
      </ul>
    {/if}
  </div>
{/if}

<script>
  import Icon from '../components/Icon.svelte'

  import { curr_path, logged_user } from '../store.js'
  import { navigate } from '../utils/navigation.js'
</script>

<style>
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 10px 30px;

    user-select: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0;
    list-style: none;
  }

  li {
    width: 100%;
  }

  p {
    display: flex;
    align-items: center;
    gap: 10px;

    box-sizing: border-box;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 3px 0;

    cursor: pointer;
  }

  p:hover {
    background: var(--bg0);
  }

  p.active {
    background: var(--bg1);
    color: var(--fg1) !important;
  }

  @media screen and (max-width: 768px) {
    .sidebar {
      flex-direction: row;
      align-items: center;
      justify-content: center;

      width: 100%;
      padding: 0;
      margin-bottom: 10px;

      overflow-x: scroll;
    }

    .sidebar h2 {
      display: none;
    }

    .sidebar ul {
      display: flex;
      flex-direction: row;
      list-style-type: none;
      padding: 0;
      margin: 0;
    }

    .sidebar li {
      margin-right: 10px;
    }
  }
</style>
