<TopBar />
<div class='page'>
  <SideBar />
  <main>
    <h1 class='tabname'>   {routes[curr_route][0]} </h1>
    <div class='hr' />
    <svelte:component this={routes[curr_route][1]} />
  </main>
</div>

<script>
  import TopBar       from './components/TopBar.svelte'
  import SideBar      from './components/SideBar.svelte'
  import Dashboard    from './routes/Dashboard.svelte'
  import Users        from './routes/Users.svelte'
  import Events       from './routes/Events.svelte'
  import EventDetails from './routes/EventDetails.svelte'

  import { curr_path } from './store.js'

  let curr_route
  const routes = {
    '':        ['Dashboard', Dashboard],
    usuarios:  ['Usuários',  Users],
    eventos:   ['Eventos',   Events],
    evento:    ['Evento',    EventDetails],
    not_found: ['404',       undefined]
  }

  $: {
    curr_route = $curr_path.split('/')[1]
    if (!routes[curr_route]) curr_route = 'not_found'
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
