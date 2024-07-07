<div class='panel'>
  <Button             action={back}          i='arrow_back' t='Voltar'  />
  <Button class='blu' action={edit_ticket}   i='edit'       t='Editar'  />
  <Button class='red' action={delete_ticket} i='delete'     t='Excluir' />
</div>

{#if !l_loading}
<div class='tas'>
  <h2> {ticket?.name} <span class='detail'> {event_name || ''} </span> </h2> <br>

  <span class={ticket?.allow_half ? 'grn' : 'red'}> {ticket?.allow_half ? 'Permite' : 'Não permite'} </span> meia <br>
  Ingresso <span class={is_active ? 'grn' : 'red'}> {is_active ? 'ativo' : 'inativo'} </span>
</div>

<div class='hr' />

<div class='panel'>
  <Button class='grn' action={create_batch} i='add' t='Criar Lote {batches.length + 1}' />
</div>

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
  import Button      from '../components/Button.svelte'
  import Modal       from '../components/Modal.svelte'
  import TicketModal from '../components/TicketModal.svelte'
  import BatchModal  from '../components/BatchModal.svelte'
  import BatchCard   from '../components/BatchCard.svelte'

  import { navigate } from '../utils/navigation.js'
  import { api } from '../utils/api.js'
  import { curr_path } from '../store.js'
  import { onMount } from 'svelte'

  let ticket, event_name, is_active, m_ticket, m_batch, l_loading = true, l_deleting
  let batches = []

  const id = $curr_path.split('/').pop()

  function edit_ticket()  { m_ticket = true }
  function create_batch() { m_batch = true }
  function back() { navigate(`/evento/${ticket.event_id}`) }

  async function load_ticket() {
    const { data } = await api(`ticket/${id}`)
    ticket = data.ticket
  }

  async function load_batches() {
    const { data } = await api(`ticket-batches/${id}`)
    batches = data.batches
  }

  $: {
    if (batches) {
      is_active = false
      for (let i in batches) {
        if (!batches[i].amount) continue
        batches[i].is_active = true
        is_active = true
        break
      }
    }
  }

  async function delete_ticket() {
    if (!confirm('Certeza que deseja excluir?')) return

    l_deleting = true
    await api(`ticket/${id}`, 'DELETE')
    back()
  }

  onMount(async _ => {
    await load_batches()
    await load_ticket()

    const { data } = await api(`events/${ticket.event_id}`)
    event_name = data.event.name
    l_loading = false
  })
</script>
