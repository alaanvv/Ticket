<div class='panel'>
  <input placeholder='Pesquisar' bind:value={query}>
  <button on:click={_ => edit_modal = true}> <span class='material-symbols-outlined'> add </span> Novo Evento </button>
</div>

<div class='cards'>
  {#each filtered_events as event}
    <EventCard {event} />
  {/each}
</div>

{#if edit_modal}
  <EventModal on:close={_ => edit_modal = false} />
{/if}

<script>
  import EventCard  from '../components/EventCard.svelte'
  import EventModal from '../components/EventModal.svelte'

  import { onMount } from 'svelte'

  let query = ''
  let events = []
  let filtered_events, edit_modal

  $: {
    filtered_events = events?.filter(e => e.name.toLowerCase().includes(query.toLowerCase()))
  }

  onMount(async _ => {
    let res = await fetch('http://192.168.1.106:3333/all-events')
    events = (await res.json()).events
  })
</script>

<style>
  .panel {
    display: flex;
    align-items: center;
    gap: 20px;

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
