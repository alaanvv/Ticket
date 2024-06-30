<div class='info' class:active={batch.is_active}>
  <h3 class='no-overflow' class:active={batch.is_active}> Lote {i + 1} </h3>

  <p> Quantidade: <b> {batch.amount} </b> </p>
  <p> Preço: <b> R${format_price(batch.priceInCents / 100)} </b> </p>
  {#if allow_half}
    <p> Preço meia: <b> R${format_price(batch.halfPriceInCents / 100)} </b> </p>
  {/if}

  <div class='row'>
    <button class='edit' on:click={_ => batch_modal = true}> <Icon i='edit' /> </button>
    <button class='del'  on:click={delete_batch}> <Icon i='delete' /> </button>
  </div>
</div>

{#if batch_modal}
  <BatchModal on:close={_ => batch_modal = false} on:update={on_update} ticket_id={batch.ticketId} allow_half={allow_half} data={batch} />
{/if}

<script>
  import Icon from '../components/Icon.svelte'
  import BatchModal  from '../components/BatchModal.svelte'

  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let batch, i, allow_half
  let batch_modal = false

  function format_price(price) {
    return String(price).replace('.', ',')
  }

  async function delete_batch() {
    if (!confirm('Certeza que deseja excluir?')) return

    await fetch(`http://localhost:3333/batch/${batch.id}`, { method: 'DELETE' })
    dispatch('update')
  }

  function on_update() {
    batch_modal = false
    dispatch('update')
  }
</script>

<style>
  h3 {
    color: var(--red);
  }

  h3.active {
    color: var(--green);
  }

  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    width: 200px;
    padding: 10px;
    border: 5px solid var(--bg0_h);
    border-radius: 10px;
  }

  .info.active {
    border-color: var(--green);
  }

  .info p {
    margin: 0;
  }

  .row {
    display: flex;
    gap: 10px;
  }

  .edit {
    background: var(--blue);
    color: white;
  }

  .del {
    background: var(--red);
    color: white;
  }
</style>
