<Modal on:close={close}>
  <h2> {data ? 'Editando' : 'Criando'} um Lote </h2>

  <form on:submit={submit}>
    <label> Preço:
      <input type='text' placeholder='R$' bind:value={batch.price} required />
    </label>

    <label> Preço de meia:
      <input type='text' placeholder='R$' bind:value={batch.half_price} required='{allow_half}' />
    </label>

    <label> Quantidade:
      <input type='number' bind:value={batch.amount} required />
    </label>

    <button type='submit'> Enviar </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'

  import { createEventDispatcher } from 'svelte'
  import { logged_user } from '../store.js'

  const dispatch = createEventDispatcher()

  export let data, ticket_id, allow_half, show
  const started_with_amount = data?.amount

  let batch = {
    price:      (data?.price_in_cents      / 100) || undefined,
    half_price: (data?.half_price_in_cents / 100) || undefined,
    amount:     data?.amount,
  }

  $: {
    if (batch.price)      batch.price      = format_price(batch.price)
    if (batch.half_price) batch.half_price = format_price(batch.half_price)
  }

  function close() { show = false }

  function format_price(price) {
    price = String(price).replaceAll(',', '.').replaceAll(/[^\d\.]/g, '')
    const parts = price.split('.')
    if (parts.length > 1)
      price = `${parts[0]}.${parts.slice(1).join('').slice(0, 2)}`
    return price
  }

  async function submit(e) {
    e.preventDefault()
    batch.price_in_cents      = batch.price      * 100
    batch.half_price_in_cents = batch.half_price * 100
    if (isNaN(batch.half_price_in_cents))
      delete batch.half_price_in_cents

    if (!data) {
      await fetch(`http://192.168.1.106:3333/create-batches/${ticket_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify({ batches: [batch] })
      })
    }
    else {
      if (batch.amount == started_with_amount)
        delete batch.amount

      await fetch(`http://192.168.1.106:3333/edit-batch/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify(batch)
      })
    }

    dispatch('update')
    close()
  }
</script>

<style>
  input, button {
    width: 100% !important;
  }

  label {
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin: 20px 0;

    text-align: start;
  }
</style>
