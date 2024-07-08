<div class='panel'>
  <Button             action={back}          i='arrow_back' t='Voltar'  />
  <Button class='blu' action={edit_ticket}   i='edit'       t='Editar'  />
  <Button class='red' action={delete_ticket} i='delete'     t='Excluir' />
</div>

{#if event_name}
  <div class='tas'>
    <h2> {ticket.name} <span class='detail'> {event_name || ''} </span> </h2> <br>

    <span class={ticket.allow_half  ? 'grn' : 'red'}> {ticket.allow_half ? 'Permite' : 'Não permite'} meia </span> <br>
    <span class={is_active          ? 'grn' : 'red'}> Ingresso  {is_active ? 'ativo' : 'inativo'}          </span>
  </div>

  <div class='hr' />

  <Button class='grn' action={create_batch} i='add' t='Criar Lote {batches.length + 1}' />

  <div class='flex-list'>
    {#each batches as batch, i}
      <BatchCard bind:batches {batch} {i} allow_half={ticket.allow_half} />
    {/each}
  </div>
{:else} Carregando...
{/if}

{#if m_ticket}
  <TicketModal bind:rendered_ticket={ticket} bind:show={m_ticket} data={ticket}  />
{/if}

{#if m_batch}
  <BatchModal bind:batches bind:show={m_batch} ticket_id={ticket.id} allow_half={ticket.allow_half} />
{/if}

{#if l_deleting}
  <Modal> Excluindo... </Modal>
{/if}

<script>
  import TicketModal from '../components/TicketModal.svelte'
  import BatchModal  from '../components/BatchModal.svelte'
  import BatchCard   from '../components/BatchCard.svelte'
  import Button      from '../components/Button.svelte'
  import Modal       from '../components/Modal.svelte'

  import { navigate } from '../utils/navigation.js'
  import { curr_path } from '../store.js'
  import { api } from '../utils/api.js'
  import { onMount } from 'svelte'

  let ticket, event_name, is_active
  let m_ticket, m_batch
  let l_deleting
  let batches = []

  function edit_ticket()  { m_ticket = true }
  function create_batch() { m_batch = true }
  function back() { navigate(`/evento/${ticket.event_id}`) }

  async function delete_ticket() {
    if (!confirm('Certeza que deseja excluir?')) return

    l_deleting = true
    await api(`ticket/${ticket.id}`, 'DELETE')
    back()
  }

  onMount(async _ => {
    ticket     = (await api(`ticket/${$curr_path.split('/').pop()}`)).data.ticket
    batches    = (await api(`ticket-batches/${ticket.id}`)).data.batches
    event_name = (await api(`events/${ticket.event_id}`)).data.event.name

    is_active = false
    for (let i in batches) {
      if (!batches[i].amount) continue
      batches[i].is_active = true
      is_active = true
      break
    }
  })
</script>
