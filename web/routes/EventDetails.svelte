<div class='panel'>
  <Button             action={back}         i='arrow_back' t='Voltar'  />
  <Button class='blu' action={edit_event}   i='edit'       t='Editar'  />
  <Button class='red' action={delete_event} i='delete'     t='Excluir' />
</div>

{#if tickets != undefined}
  <div class='info'>
    <img src={event.image} alt='Sem imagem'>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class='data' on:click={open_details}>
      <h2 class='row'> {event.name} <span class='row detail'> <Icon i='calendar_month' /> {(new Date(event.date)).toLocaleDateString('pt-BR')} </span> </h2> <br>
      {event.description || 'Sem descrição.'}
    </div>

    <div class='local'>
      <p class='row'> <b class='row'> <Icon i='map' /> Local:    </b> {event.local} </p>
        <p class='row'> <b class='row'> <Icon i='location_on' /> Endereço: </b> {event.address} </p>
          <p class='row'> <b class='row'> <Icon i='public' /> <a href={`https://www.google.com/maps?q=${event.latitude},${event.longitude}`}> Localização no maps </a> </b> </p>
    </div>
  </div>

  <div class='hr' />
  <Button class='grn' action={create_ticket} i='add' t='Criar Ingresso' />

  <div class='flex-list'>
    {#each tickets || [] as ticket}
      <TicketCard {ticket} />
    {/each}
  </div>
{:else} Carregando...
{/if}

{#if l_deleting}
  <Modal> Excluindo... </Modal>
{/if}

{#if m_event}
  <EventModal bind:rendered_event={event} bind:show={m_event} data={event} />
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
  import TicketModal from '../components/TicketModal.svelte'
  import EventModal  from '../components/EventModal.svelte'
  import TicketCard  from '../components/TicketCard.svelte'
  import Button      from '../components/Button.svelte'
  import Modal       from '../components/Modal.svelte'
  import Icon        from '../components/Icon.svelte'

  import { curr_path, opened_event } from '../store.js'
  import { navigate } from '../utils/navigation.js'
  import { api } from '../utils/api.js'
  import { onMount } from 'svelte'

  let event, tickets
  let l_deleting
  let m_event, m_ticket, m_details

  function back() { navigate('/eventos') }
  function edit_event()    { m_event   = true }
  function create_ticket() { m_ticket  = true }
  function open_details()  { m_details = true }

  async function delete_event() {
    if (!confirm('Certeza que deseja excluir?')) return

    l_deleting = true
    await api(`event/${event.id}`, 'DELETE')
    back()
  }

  onMount(async _ => {
    const { data } = (await api(`events/${$curr_path.split('/').pop()}`))
    event   = data.event
    tickets = data.tickets
    opened_event.set({ ...event, tickets })
  })
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

  .info p {
    margin: 0 5px;
  }

  @media screen and (max-width: 768px) {
    img {
      max-height: none;
    }

    .info {
      flex-direction: column;

      max-height: none;
    }

    .info > * {
      max-width: 100%;
    }

    .local {
      margin: 0;
      padding: 20px 10px;
    }
  }
</style>
