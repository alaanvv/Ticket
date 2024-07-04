<Modal on:close={close}>
  <h2> {data ? 'Editando' : 'Criando'} um Ingresso </h2>

  <form on:submit={submit}>
    <label> Nome:
      <input placeholder= 'Nome do ingresso' bind:value={ticket.name} required />
    </label>

    <label class='row'> Permitir meia:
      <input type='checkbox' bind:checked={ticket.allow_half} />
    </label>

    <button type='submit'> Enviar </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'

  import { createEventDispatcher } from 'svelte'
  import { navigate } from '../utils/navigation.js'
  import { logged_user } from '../store.js'

  const dispatch = createEventDispatcher()

  export let data, event_id, show

  let ticket = {
    name:       data?.name,
    allow_half: data?.allow_half
  }

  function close() { show = false }

  async function submit(e) {
    e.preventDefault()

    if (!data) {
      const res = await fetch(`http://192.168.1.106:3333/ticket/${event_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify(ticket)
      })

      navigate(`/ingresso/${(await res.json()).id}`)
    }
    else {
      await fetch(`http://192.168.1.106:3333/edit-ticket/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify(ticket)
      })

      dispatch('update')
      close()
    }
  }
</script>

<style>
  input:not([type='checkbox']), button {
    width: 100% !important;
  }

  label {
    margin: 20px 0;

    text-align: start;
  }
  label:not(.row) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
</style>
