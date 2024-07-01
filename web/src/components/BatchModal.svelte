<Modal on:close={_ => dispatch('close')}>
  <h2> {data ? 'Editando' : 'Criando'} um Lote </h2> <!-- Show batch num and also set required | Make amount field not send if equal -->

  <form on:submit={submitForm}>
    <label> <p> Preço: </p>
      <input type='text' placeholder='R$' bind:value={batch.price} required />
    </label>

    <label> <p> Preço de meia: </p>
      <input type='text' placeholder='R$' bind:value={batch.half_price} required='{allow_half}' />
    </label>
    <label> <p> Quantidade: </p>
      <input type='number' bind:value={batch.amount} required />
    </label>

    <button type="submit"> Enviar </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'

  import { createEventDispatcher } from 'svelte'
  import { logged_user } from '../store.js'

  const dispatch = createEventDispatcher()

  export let data = undefined
  export let ticket_id, allow_half

  const started_with_amount = data?.amount

  let batch = {
    price:      data ? (data.price_in_cents     / 100) : undefined,
    half_price: data ? (data.half_price_in_cents / 100) : undefined,
    amount:     data?.amount,
  }

  $: {
    if (batch.price)
      batch.price = format_price(batch.price)
    if (batch.half_price)
      batch.half_price = format_price(batch.half_price)
  }

  async function submitForm(e) {
    e.preventDefault()
    batch.price_in_cents     = batch.price      * 100
    batch.half_price_in_cents = batch.half_price * 100
    if (isNaN(batch.half_price_in_cents))
      delete batch.half_price_in_cents

    if (!data) {
      await fetch(`http://localhost:3333/create-batches/${ticket_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify({ batches: [batch] })
      })

      dispatch('update')
    }
    else {
      if (batch.amount == started_with_amount)
        delete batch.amount

      await fetch(`http://localhost:3333/edit-batch/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify(batch)
      })

      dispatch('update')
    }
  }

  function format_price(price) {
    price = String(price)
    price = price.replaceAll(',', '.').replaceAll(/[^\d\.]/g, '')
    const parts = price.split('.')
    if (parts.length > 1)
      price = `${parts[0]}.${parts.slice(1).join('').slice(0, 2)}`
    return price
  }
</script>

<style>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input {
    width: 100% !important;

    resize: none;
  }

  label {
    display: flex;
    flex-direction: column;

    margin-top: 10px;
  }

  label p {
    float: left;

    width: 50%;
    margin: 0;

    text-align: start;
  }

  label input {
    float: left;

    width: 75%;
    margin-top: 6px;
  }
</style>
