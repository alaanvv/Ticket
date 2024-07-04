<div class='panel'>
  <Button             action={back}         i='arrow_back' t='Voltar'  />
  <Button class='blu' action={edit_event}   i='edit'       t='Editar'  />
  <Button class='red' action={delete_event} i='delete'     t='Excluir' />
</div>

<div class='info'>
  <img src={event?.image} alt='Sem imagem'>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class='data' on:click={open_details}>
    <h2 class='row'> {event?.name} <span class='detail'> <Icon i='calendar_month' /> {formatted_date} </span> </h2> <br>
    {event?.description || 'Sem descrição.'}
  </div>

  <div class='local'>
    <b class='row'> <Icon i='map' />         Local:    </b> <br> {event?.local}
    <b class='row'> <Icon i='location_on' /> Endereço: </b> <br> {event?.address}
    <b class='row'> <Icon i='public' /> <a href={maps_link}> Localização no maps </a> </b>
  </div>
</div>

<div class='hr' />

<div class='panel'>
  <Button class='grn' action={create_ticket} i='add' t='Criar Ingresso' />
</div>

<div class='flex-list'>
  {#each tickets || [] as ticket}
    <TicketCard {ticket} />
  {/each}
</div>

{#if m_event}
  <EventModal bind:show={m_event} on:update={load_event} data={event} />
{/if}

{#if m_ticket}
  <TicketModal bind:show={m_ticket} event_id={event.id} />
{/if}

{#if m_details}
  <Modal bind:show={m_details}>
    <h2> {event.name} </h2>
    <p class='wrappable'> {event.description} </p>
  </Modal>
{/if}

<script>
  import Button      from '../components/Button.svelte'
  import Icon        from '../components/Icon.svelte'
  import Modal       from '../components/Modal.svelte'
  import EventModal  from '../components/EventModal.svelte'
  import TicketModal from '../components/TicketModal.svelte'
  import TicketCard  from '../components/TicketCard.svelte'

  import { navigate } from '../utils/navigation.js'
  import { curr_path, logged_user } from '../store.js'
  import { onMount } from 'svelte'

  let event, tickets, formatted_date, maps_link, m_event, m_ticket, m_details

  const id = $curr_path.split('/').pop()

  $: {
    if (event) {
      formatted_date = (new Date(event.date)).toLocaleDateString('pt-BR')
      maps_link = `https://www.google.com/maps?q=${event.latitude},${event.longitude}`
    }
  }

  function back() { navigate('/eventos') }
  function edit_event()    { m_event   = true }
  function create_ticket() { m_ticket  = true }
  function open_details()  { m_details = true }

  async function load_event() {
    let res = await fetch(`http://192.168.1.106:3333/events/${id}`)
    event = (await res.json()).event

    res = await fetch(`http://192.168.1.106:3333/event-tickets/${id}`)
    tickets = (await res.json()).tickets
  }

  async function delete_event() {
    if (!confirm('Certeza que deseja excluir?')) return

    await fetch(`http://192.168.1.106:3333/event/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${$logged_user.session_id}` }
    })
    back()
  }

  onMount(load_event)
</script>

<style>
  .data {
    padding: 5px;
    overflow: hidden;

    cursor: pointer;
  }

  .info {
    display: flex;
    gap: 20px;

    max-height: 300px;
    margin-top: 20px;

    text-align: start;
  }

  .info > * {
    max-width: 33%;
  }

  .local {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;

    padding: 30px;
    margin-left: auto;

    background: var(--bg0_h);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    overflow: auto;
  }

  img {
    max-height: 300px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

    background: black;
    object-fit: cover;

    color: white;
  }
</style>
