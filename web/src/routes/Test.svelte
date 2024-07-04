<form on:submit={submit}>
  <label> Evento:
    <select bind:value={event_id} on:change={load_tickets}>
      {#each events || [] as event}
        <option value={event.id}> {event.name} </option>
      {/each}
    </select>
  </label>

  <label> Ingresso:
    <select bind:value={ticket_id} disabled={!event_id}>
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

{#if ticket_instance.id}
  <div class='hr' />

  <img src={ticket_instance.qr} alt='QR Code' />
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <p on:click={copy} class='code t-w-icon'> {ticket_instance.id} <Icon i='content_copy' /> </p>
{/if}

<script>
  import Icon from '../components/Icon.svelte'

  import { logged_user } from '../store.js'
  import { copy_to_clipboard } from '../utils/misc.js'
  import { onMount } from 'svelte'
  import QRCode from 'qrcode'

  let events, tickets, event_id, ticket_id, is_half
  let ticket_instance = {}

  function copy() { copy_to_clipboard(ticket_instance.id) }

  async function load_tickets() {
    let res = await fetch(`http://192.168.1.106:3333/event-tickets/${event_id}`)
    let all_tickets = (await res.json()).tickets

    tickets = (await Promise.all(
      all_tickets.map(async t => {
        const res = await fetch(`http://192.168.1.106:3333/ticket-batches/${t.id}`)
        const data  = await res.json()
        return { ...t, has_batch: data.batches.length }
      })
    )).filter(t => t.has_batch)

    if (tickets.length == 1)
      ticket_id = tickets[0].id
  }

  async function submit(e) {
    e.preventDefault()

    let res = await fetch(`http://192.168.1.106:3333/ticket-batches/${ticket_id}`)
    const batch_id = (await res.json()).batches[0].id

    res = await fetch(`http://192.168.1.106:3333/ticket-instance/${batch_id}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${logged_user.session_id}` },
      body: JSON.stringify({ price_in_cents: 0, is_half, is_test: true })
    })
    const { id } = await res.json()

    ticket_instance.qr = await QRCode.toDataURL(id)
    ticket_instance.id = id
  }
  onMount(async _ => {
    const res = await fetch('http://192.168.1.106:3333/all-events')
    events = (await res.json()).events
  })
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
