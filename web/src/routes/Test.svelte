<form on:submit={submitForm}>
  <label> <p> Evento: </p>
    <select bind:value={event_id} on:change={load_tickets}>
      {#each events as event}
        <option value={event.id}> {event.name} </option>
      {/each}
    </select>
  </label>

  <label> <p> Ingresso: </p>
    <select bind:value={ticket_id} disabled={!event_id}>
      {#each tickets as ticket}
        <option value={ticket.id}> {ticket.name} </option>
      {/each}
    </select>
  </label>

  <label class='inline cp'> <p> Meia: </p>
    <input type='checkbox' bind:checked={is_half} />
  </label>

  <button type='submit' disabled={!ticket_id}> Criar Ingresso Teste </button>
</form>

{#if ticket_instance.id}
  <div class='hr' />
  <img src={ticket_instance.qr} alt='QR Code' />
  <p class='code t-w-icon'> {ticket_instance.id} <Icon on:click={copy_to_clipboard} i='content_copy' /> </p>
{/if}

<script>
  import Icon from '../components/Icon.svelte'
  import { logged_user } from '../store.js'
  import { onMount } from 'svelte'
  import QRCode from 'qrcode'

  let events = []
  let tickets = []
  let event_id, ticket_id, is_half
  let ticket_instance = {}

  onMount(async _ => {
    const res = await fetch('http://192.168.1.106:3333/all-events')
    events = (await res.json()).events
  })

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

  async function submitForm(e) {
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

  function copy_to_clipboard() {
    navigator.clipboard.writeText(ticket_instance.id)
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;

    max-width: 300px;
    margin: 0 auto;
  }

  select {
    width: 100% !important;
    margin: 10px 0;

    resize: none;
  }

  label {
    display: flex;
    flex-direction: column;
  }

  label p {
    float: left;

    width: 50%;
    margin: 0;

    text-align: start;
  }

  .inline {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    gap: 5px;
  }

  .inline p, .inline input {
    display: block;
    width: auto !important;
    text-wrap: nowrap;
  }

  button {
    background: var(--green);
    color: var(--bg0)
  }

  img {
    display: block;

    width: 50%;
    margin: 0 auto;
  }

  .code {
    display: inline-flex;
    gap: 10px;

    padding: 10px;

    background: var(--bg0_h);
    border-radius: 10px;
  }

  :global(.code span) {
    cursor: pointer;
  }

  :global(.code span) {
    cursor: pointer;
  }
</style>
