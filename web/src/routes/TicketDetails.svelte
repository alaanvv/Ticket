<div class='panel'>
  <button class='back' on:click={_ => navigate(`/evento/${ticket.eventId}`)}> <Icon i='arrow_back' /> Voltar  </button>
  <button class='edit' on:click={_ => edit_modal = true}>               <Icon i='edit' />       Editar  </button>
  <button class='del'  on:click={delete_ticket}>                         <Icon i='delete' />     Excluir </button>
</div>

{#if ticket}
  <div class='info'>
    <h2 class='t-w-icon'>
      {ticket.name}
      {#if event_name} <span class='detail'> {event_name} </span> {/if}
    </h2>

    <p> <span class='active-indicator' class:active={ticket.allowHalf}> {ticket.allowHalf ? 'Permite' : 'Não permite'} </span> meia <p>
    <p> Este ingresso está <span class='active-indicator' class:active={is_active}> {is_active ? 'ativo' : 'inativo'} </span> <p>
  </div>

  <div class='hr' />
  <div class='panel'>
    <button class='new' on:click={_ => batch_modal = true}> <Icon i='add' /> Criar Lote </button>
  </div>

  <div class='batches'>
    {#each batches as batch, i}
      <BatchCard {batch} {i} allow_half={ticket.allowHalf} on:update={load_ticket} />
    {/each}
  </div>
{/if}

{#if edit_modal}
  <TicketModal data={ticket} on:close={_ => edit_modal = false} on:update={finish_editing} />
{/if}

{#if batch_modal}
  <BatchModal on:close={_ => batch_modal = false} on:update={finish_batch_creation} ticket_id={ticket.id} allow_half={ticket.allowHalf} />
{/if}

<script>
  import Icon        from '../components/Icon.svelte'
  import TicketModal from '../components/TicketModal.svelte'
  import BatchModal  from '../components/BatchModal.svelte'
  import BatchCard  from '../components/BatchCard.svelte'

  import { navigate } from '../utils/navigation.js'
  import { curr_path } from '../store.js'
  import { onMount } from 'svelte'

  let ticket, event_name, is_active
  const id = $curr_path.split('/').pop()

  let edit_modal = false
  let batch_modal = false

  let batches = []

  async function load_ticket() {
    let res = await fetch(`http://localhost:3333/ticket/${id}`)
    ticket = (await res.json()).ticket

    res = await fetch(`http://localhost:3333/ticket-batches/${id}`)
    batches = (await res.json()).batches

    res = await fetch(`http://localhost:3333/events/${ticket.eventId}`)
    event_name = (await res.json()).event.name

    for (let i in batches) {
      if (!batches[i].amount) continue
      batches[i].is_active = true
      break
    }
  }

  async function delete_ticket() {
    if (!confirm('Certeza que deseja excluir?')) return

    await fetch(`http://localhost:3333/ticket/${id}`, { method: 'DELETE' })
    navigate(`/evento/${ticket.eventId}`)
  }

  function finish_editing() {
    edit_modal = false
    load_ticket()
  }

  function finish_batch_creation() {
    batch_modal = false
    load_ticket()
  }

  onMount(load_ticket)
</script>

<style>
  .batches {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;

    margin-top: 20px;

    overflow: scroll;
  }

  .detail {
    padding: 5px 10px;
    border-radius: 20px;

    background: var(--bg0_h);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

    font-size: 0.7em;
  }

  .panel {
    display: flex;
    align-items: center;
    gap: 20px;

    width: 100%;
    margin-top: 10px;
  }

  .panel button {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .edit {
    background: var(--blue);
    color: white;
  }

  .del {
    background: var(--red);
    color: white;
  }

  .new {
    background: var(--green);
    color: white;
  }

  .info {
    margin-top: 20px;

    text-align: start;
  }

  .info h2 {
    display: flex;
    align-items: center;
    gap: 10px;

    margin-bottom: 20px;
  }

  .active-indicator {
    font-weight: bold;
    color: var(--red);
  }

  .active-indicator.active {
    color: var(--green);
  }
</style>
