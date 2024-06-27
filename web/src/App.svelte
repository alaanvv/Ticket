<TopBar />

<div class='page'>
  <SideBar />
  <main>
    {#if $current_path === '/eventos'}
      <Events />
    {:else if $current_path === '/usuarios'}
      <Users />
    {:else}
      <Dashboard />
    {/if}
  </main>
</div>

<script>
  import TopBar    from "./components/TopBar.svelte"
  import SideBar   from "./components/SideBar.svelte"
  import Dashboard from "./components/Dashboard.svelte"
  import Users     from "./components/Users.svelte"
  import Events    from "./components/Events.svelte"

  import { onMount } from 'svelte'
  import { current_path } from './store.js'

  onMount(_ => {
    const updatePath = _ => { current_path.set(window.location.pathname) }
    window.addEventListener('popstate', updatePath)
    return _ => { window.removeEventListener('popstate', updatePath) }
  })
</script>

<style>
  main {
    background: var(--bg0);
    text-align: center;
    padding: 1em;
    max-width: 240px;
    margin: 0 auto;
    border-radius: 10px;
    width: 100%;
    margin: 0 20px;
    overflow:auto;
  }

  .page {
    display: flex;
    flex-direction: row;

    margin: 15px 0;
    flex-grow: 2;
    max-height: 88%;
  }

  @media (min-width: 640px) {
    main {
      max-width: none;
    }
  }
</style>
