<TopBar />

<div class='page'>
  <SideBar />
  <main>
    <h1 class='tabname'> {resolve_path_name($current_path)} </h1>
    <div class='hr'></div>

    {#if      $current_path == '/eventos'}          <Events />
    {:else if $current_path == '/usuarios'}         <Users />
    {:else if $current_path.startsWith('/evento/')} <EventDetails />
    {:else}                                         <Dashboard />
    {/if}
  </main>
</div>

<script>
  import TopBar       from "./components/TopBar.svelte"
  import SideBar      from "./components/SideBar.svelte"
  import Dashboard    from "./routes/Dashboard.svelte"
  import Users        from "./routes/Users.svelte"
  import Events       from "./routes/Events.svelte"
  import EventDetails from "./routes/EventDetails.svelte"

  import { current_path } from './store.js'

  function resolve_path_name(path) {
    if (path.startsWith('/evento/')) return 'Evento'

    switch (path) {
      case '/':         return 'Dashboard'
      case '/usuarios': return 'Usuários'
      case '/eventos':  return 'Eventos'
      default:          return 'Desconhecido'
    }
  }
</script>

<style>
  main {
    width: 100%;
    padding: 1em 1.5em;

    margin: 0 20px 0 0;
    background: var(--bg0);
    border-radius: 10px;
    overflow:auto;

    text-align: center;
  }

  .page {
    display: flex;
    flex-direction: row;
    flex-grow: 2;

    max-height: 88%;
    margin: 15px 0;
  }
</style>
