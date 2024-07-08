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

    <button type='submit' disabled={l_submitting}> {l_submitting ? '...' : 'Enviar'} </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'

  import { api } from '../utils/api.js'

  export let data, ticket_id, allow_half, show, rendered_batch, batches, l_submitting
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
    l_submitting = true
    batch.price_in_cents      = batch.price      * 100
    batch.half_price_in_cents = batch.half_price * 100
    if (isNaN(batch.half_price_in_cents))
      delete batch.half_price_in_cents

    if (!data) {
      const { id } = (await api(`create-batches/${ticket_id}`, 'POST', { batches: [batch] })).data
      batches = [...batches, { id, ...batch }]
    }
    else {
      if (batch.amount == started_with_amount)
        delete batch.amount

      await api(`edit-batch/${data.id}`, 'PUT', batch)
      rendered_batch = { ...rendered_batch, ...batch }
    }

    l_submitting = false
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
