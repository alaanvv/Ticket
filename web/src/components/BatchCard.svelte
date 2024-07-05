<div class='card' class:active={batch.is_active}>
  <h3 class='oe red'> Lote {i + 1} </h3>

  <p> Quantidade: <b> {batch.amount} </b> </p>
  <p> Preço: <b> R${format_price(batch.price_in_cents)} </b> </p>
  {#if allow_half}
    <p> Preço meia: <b> R${format_price(batch.half_price_in_cents)} </b> </p>
  {/if}

  <div class='row'>
    <Button class='blu' action={edit_batch} i='edit' />
    <Button class='red' action={delete_batch} i='delete' />
  </div>
</div>

{#if m_batch}
  <BatchModal bind:show={m_batch} on:update={update} ticket_id={batch.ticket_id} allow_half={allow_half} data={batch} />
{/if}

<script>
  import Button     from '../components/Button.svelte'
  import BatchModal from '../components/BatchModal.svelte'

  import { createEventDispatcher } from 'svelte'
  import { api } from '../utils/api.js'

  const dispatch = createEventDispatcher()

  export let batch, i, allow_half
  let m_batch

  function edit_batch() { m_batch = true }
  function update() { dispatch('update') }

  function format_price(price) {
    return String(price / 100).replace('.', ',')
  }

  async function delete_batch() {
    if (!confirm('Certeza que deseja excluir?')) return

    await api(`batch/${batch.id}`, 'DELETE')
    dispatch('update')
  }
</script>

<style>
  .active h3 {
    color: var(--green);
  }

  .card {
    width: 180px;
  }
  .card.active {
    border-color: var(--green);
  }

  .row {
    justify-content: center;
  }
</style>
