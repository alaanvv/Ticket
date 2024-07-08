<form class='tas' on:submit={submit}>
  <label> Evento:
    <select bind:value={event_id} on:change={load_tickets} class:cw={events == undefined}>
      {#each events || [] as event}
        <option value={event.id}> {event.name} </option>
      {/each}
    </select>
  </label>

  <label> Ingresso:
    <select bind:value={ticket_id} class:cw={tickets == undefined} disabled={!event_id}>
      {#each tickets || [] as ticket}
        <option value={ticket.id}> {ticket.name} </option>
      {/each}
    </select>
  </label>

  <label> Meia:
    <input type='checkbox' bind:checked={is_half} />
  </label>

  <button class='grn' type='submit' disabled={!ticket_id}> Criar Ingresso Teste </button>
</form>

<div class='hr' />

{#if l_ticket_instance} Carregando... {/if}

{#if ticket_instance.id}
  <img src={ticket_instance.qr} alt='QR Code' />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <p on:click={copy} class='code t-w-icon'> {ticket_instance.id} <Icon i='content_copy' /> </p>
{/if}

<script>
  import Icon from '../components/Icon.svelte'

  import { copy_to_clipboard } from '../utils/misc.js'
  import { api } from '../utils/api.js'
  import { onMount } from 'svelte'
  import QRCode from 'qrcode'

  let events, tickets, event_id, ticket_id, is_half
  let l_ticket_instance
  let ticket_instance = {}

  function copy() { copy_to_clipboard(ticket_instance.id) }

  async function load_tickets() {
    tickets = undefined

    let { data } = await api(`event-tickets/${event_id}`)
    let all_tickets = data.tickets

    tickets = (await Promise.all(
      all_tickets.map(async t => {
        const { data } = await api(`ticket-batches/${t.id}`)
        return { ...t, has_batch: data.batches.length }
      })
    )).filter(t => t.has_batch)

    if (tickets.length)
      ticket_id = tickets[0].id
  }

  async function submit(e) {
    e.preventDefault()
    l_ticket_instance = true

    let { data } = await api(`ticket-batches/${ticket_id}`)
    const batch_id = data.batches[0].id

    const { id } = (await api(`ticket-instance/${batch_id}`, 'POST', { price_in_cents: 0, is_half, is_test: true })).data

    ticket_instance.qr = await QRCode.toDataURL(id)
    ticket_instance.id = id

    l_ticket_instance = false
  }

  onMount(async _ => events = (await api('all-events')).data.events)
</script>

<style>
  form {
    max-width: 300px;
    margin: 0 auto;
  }

  select, button {
    width: 100% !important;
    margin: 10px 0;
  }

  img {
    display: block;

    width: 50%;
    max-width: 400px;
    margin: 0 auto;
    image-rendering: pixelated;
  }

  .code {
    display: inline-flex;
    gap: 10px;

    padding: 10px;

    background: var(--bg0_h);
    border-radius: 10px;

    cursor: pointer;
  }
</style>
