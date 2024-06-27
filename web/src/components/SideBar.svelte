<script>
  import { current_path } from '../store.js'

  const navigate = path => {
    window.history.pushState({}, '', path)
    current_path.set(path)
  }
</script>

<div class='col'>
  <h2> Admin </h2>

  <ul>
    <li> <p class:active={$current_path == '/'} on:click={_ => navigate('/')}> <span class="material-symbols-outlined">dashboard</span> Dashboard </p> </li>
    <li> <p class:active={$current_path == '/usuarios'} on:click={_ => navigate('/usuarios')}> <span class="material-symbols-outlined">group</span> Usuários </p>  </li>
    <li> <p class:active={$current_path == '/eventos'} on:click={_ => navigate('/eventos')}> <span class="material-symbols-outlined">event</span> Eventos </p>   </li>
  </ul>

  <div class='hr'></div>
</div>

<style>
  * {
    user-select: none;
    color: var(--fg0) !important;
  }

  .col {
    display: flex;
    flex-direction: column;
    align-items: center;

    padding: 0 20px;
    border-right: 3px solid var(--gray);
  }

  ul {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 5px;

    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
  }

  li {
    width: 100%;
    text-align:center;
  }

  p {
    display: flex;
    align-items: center;
    gap: 10px;

    box-sizing:border-box;
    width: 100%;
    padding: 10px 20px;
    border-radius: 5px;
    margin: 3px 0;

    text-decoration: none;
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
