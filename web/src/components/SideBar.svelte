<div class='col'>
  <h2> Admin </h2>

  <ul>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li> <p class:active={$curr_path == '/'}         on:click={_ => navigate('/')}>         <Icon i='dashboard' /> Dashboard </p> </li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li> <p class:active={$curr_path == '/usuarios'} on:click={_ => navigate('/usuarios')}> <Icon i='group' />     Usuários  </p> </li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li> <p class:active={$curr_path == '/eventos'}  on:click={_ => navigate('/eventos')}>  <Icon i='event' />     Eventos   </p> </li>
  </ul>
</div>

<script>
  import Icon from '../components/Icon.svelte'

  import { curr_path } from '../store.js'
  import { navigate } from '../utils/navigation.js'
</script>

<style>
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 10px 40px;

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
</style>
