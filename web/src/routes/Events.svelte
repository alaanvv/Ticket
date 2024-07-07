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

{#if l_events} Carregando... {/if}

<script>
  import EventCard  from '../components/EventCard.svelte'
  import EventModal from '../components/EventModal.svelte'
  import Button     from '../components/Button.svelte'

  import { onMount } from 'svelte'
  import { api } from '../utils/api.js'

  let raw_events, events, query, m_event, l_events

  $: {
    events = raw_events?.filter(e => e.name.toLowerCase().includes((query || '').toLowerCase())) || []
  }

  function create_event() { m_event = true }

  onMount(async _ => {
    l_events = true
    let { data } = await api('all-events')
    raw_events = data.events
    l_events = false
  })
</script>
