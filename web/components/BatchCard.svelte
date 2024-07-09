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
  <BatchModal bind:rendered_batch={batch} bind:show={m_batch} ticket_id={batch.ticket_id} allow_half={allow_half} data={batch} />
{/if}

<script>
  import Button     from '../components/Button.svelte'
  import BatchModal from '../components/BatchModal.svelte'

  import { api } from '../utils/api.js'

  export let batch, i, allow_half, batches
  let m_batch

  function edit_batch() { m_batch = true }
  function format_price(price) { return String(price / 100).replace('.', ',') }

  function delete_batch() {
    if (!confirm('Certeza que deseja excluir?')) return

    batches = batches.filter(b => b.id != batch.id)
    api(`batch/${batch.id}`, 'DELETE')
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

  @media screen and (max-width: 768px) {
    .card {
      width: 35%;
    }
  }
</style>
