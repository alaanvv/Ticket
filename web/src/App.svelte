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
  import TopBar        from './components/TopBar.svelte'
  import SideBar       from './components/SideBar.svelte'
  import Dashboard     from './routes/Dashboard.svelte'
  import Users         from './routes/Users.svelte'
  import Events        from './routes/Events.svelte'
  import EventDetails  from './routes/EventDetails.svelte'
  import TicketDetails from './routes/TicketDetails.svelte'
  import Login         from './routes/Login.svelte'

  import { curr_path, logged_user } from './store.js'

  let curr_route
  const routes = {
    '':        ['Login',     Login,         'any'  ],
    dashboard: ['Dashboard', Dashboard,     'admin'],
    usuarios:  ['Usuários',  Users,         'admin'],
    eventos:   ['Eventos',   Events,        'admin'],
    evento:    ['Evento',    EventDetails,  'admin'],
    ingresso:  ['Ingresso',  TicketDetails, 'admin'],
    not_found: ['404',       undefined,     'any'  ]
  }

  $: {
    curr_route = $curr_path.split('/')[1]
    if (!routes[curr_route]) curr_route = 'not_found'

    if (curr_route != '' && !$logged_user)
      curr_route = ''

    let allowed_role = routes[curr_route][2]

    if (allowed_role == 'admin' && $logged_user.role != 'admin')
      curr_route = 'not_found'

    if ($logged_user?.role == 'admin' && curr_route == '')
      curr_route = 'dashboard'
    if ($logged_user?.role == 'portaria' && curr_route == '')
      curr_route = 'verificacao'

    if (!routes[curr_route]) curr_route = 'not_found'
  }
</script>

<style>
  main {
    width: 100%;
    padding: 1em 1.5em;

    margin: 0 20px;
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
