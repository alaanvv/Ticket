<div class='panel'>
  <input placeholder='Pesquisar' bind:value={search_query}>
  <button on:click={swap_modal}> <span class="material-symbols-outlined"> add </span> Criar </button>
</div>

<div class='cards'>
  {#each filtered_events as event}
    <EventCard {event} />
  {/each}
</div>

{#if show_modal}
  <EventModal on:close={swap_modal} />
{/if}

<script>
  import EventCard  from '../components/EventCard.svelte'
  import EventModal from '../components/EventModal.svelte'
  import { onMount } from 'svelte'

  let events = []

  onMount(async _ => {
    let res = await fetch('http://localhost:3333/all-events')
    events = (await res.json()).events
  })

  let filtered_events = events
  let search_query = ''

  $: {
    if (events)
      filtered_events = events.filter(e => e.name.toLowerCase().includes(search_query.toLowerCase()))
  }

  let show_modal = false
  function swap_modal() { show_modal = !show_modal  }
</script>

<style>
  .panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-top: 10px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    color: var(--fg1);
    font-weight: bold;

    background: var(--green);
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;

    margin-top: 30px;

    overflow: scroll;
  }
</style>
