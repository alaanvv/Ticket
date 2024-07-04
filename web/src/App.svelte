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
  import Users         from './routes/Users.svelte'
  import Events        from './routes/Events.svelte'
  import EventDetails  from './routes/EventDetails.svelte'
  import TicketDetails from './routes/TicketDetails.svelte'
  import Login         from './routes/Login.svelte'
  import Verification  from './routes/Verification.svelte'
  import History       from './routes/History.svelte'
  import Test          from './routes/Test.svelte'

  import { curr_path, logged_user } from './store.js'

  let curr_route
  const routes = {
    '':          ['Login',       Login,         0],
    usuarios:    ['Usuários',    Users,         2],
    eventos:     ['Eventos',     Events,        2],
    evento:      ['Evento',      EventDetails,  2],
    ingresso:    ['Ingresso',    TicketDetails, 2],
    verificacao: ['Verificação', Verification,  1],
    historico:   ['Histórico',   History,       1],
    teste:       ['Teste',       Test,          1],
    not_found:   ['404',         undefined,     1]
  }

  $: {
    curr_route = $curr_path.split('/')[1]
    if (!routes[curr_route]) curr_route = 'not_found'

    const user_level = { 'admin': 2, 'portaria': 1, 'undefined': 0 }[$logged_user?.role]

    if (!user_level)                        curr_route = ''
    if (user_level == 2 && curr_route == '') curr_route = 'eventos'
    if (user_level == 1 && curr_route == '') curr_route = 'verificacao'

    if (user_level < routes[curr_route][2] || !routes[curr_route]) curr_route = 'not_found'
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

  @media screen and (max-width: 768px) {
    .page {
      flex-direction: column;
    }

    main {
      width: auto;
      margin: 0;
      padding: 1em 0.7em 50px 0.7em;
      border-radius: 0;
    }
  }
</style>
