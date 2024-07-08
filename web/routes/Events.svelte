<div class='panel'>
  <input placeholder='Pesquisar' bind:value={query}>
  <Button class='grn' action={create_event} i='add' t='Novo Evento'  />
</div>

<div class='flex-list'>
  {#each events || [] as event}
    <EventCard {event} />
  {/each}
</div>

{#if !events} Carregando... {/if}

{#if m_event}
  <EventModal bind:show={m_event} />
{/if}

<script>
  import EventCard  from '../components/EventCard.svelte'
  import EventModal from '../components/EventModal.svelte'
  import Button     from '../components/Button.svelte'

  import { api } from '../utils/api.js'
  import { onMount } from 'svelte'

  let raw_events, events, query
  let m_event

  function create_event() { m_event = true }

  $: {
    events = raw_events?.filter(e => e.name.toLowerCase().includes((query?.toLowerCase() || '')))
  }

  onMount(async _ => {
    let { data } = await api('all-events')
    raw_events = data.events
  })
</script>
