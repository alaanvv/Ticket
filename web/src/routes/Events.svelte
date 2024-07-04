<div class='panel'>
  <input placeholder='Pesquisar' bind:value={query}>
  <Button class='grn' action={create_event} i='add' t='Novo Evento'  />
</div>

<div class='flex-list'>
  {#each events as event}
    <EventCard {event} />
  {/each}
</div>

{#if m_event}
  <EventModal bind:show={m_event} />
{/if}

<script>
  import EventCard  from '../components/EventCard.svelte'
  import EventModal from '../components/EventModal.svelte'
  import Button     from '../components/Button.svelte'

  import { onMount } from 'svelte'

  let raw_events, events, query, m_event

  $: {
    events = raw_events?.filter(e => e.name.toLowerCase().includes((query || '').toLowerCase())) || []
  }

  function create_event() { m_event = true }

  onMount(async _ => {
    let res = await fetch('http://192.168.1.106:3333/all-events')
    raw_events = (await res.json()).events
  })
</script>
