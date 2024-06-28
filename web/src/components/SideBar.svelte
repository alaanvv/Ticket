<div class='col'>
  <h2> Admin </h2>

  <ul>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li> <p class:active={$current_path == '/'}         on:click={_ => navigate('/')}>
      <span class="material-symbols-outlined"> dashboard </span> Dashboard </p>
    </li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li> <p class:active={$current_path == '/usuarios'} on:click={_ => navigate('/usuarios')}>
      <span class="material-symbols-outlined"> group </span> Usuários </p>
    </li>
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <li> <p class:active={$current_path == '/eventos'}  on:click={_ => navigate('/eventos')}>
      <span class="material-symbols-outlined"> event </span> Eventos </p>
    </li>
  </ul>

</div>

<script>
  import { current_path } from '../store.js'
  import { navigate } from '../utils/navigation.js'
</script>

<style>
  .col {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0 20px;

    user-select: none;
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0;
    margin: 0;
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

  p.active, p.active span {
    background: var(--bg1);
    color: var(--fg1) !important;
  }
</style>
