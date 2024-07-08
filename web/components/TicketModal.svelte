<Modal on:close={close}>
  <h2> {data ? 'Editando' : 'Criando'} um Ingresso </h2>

  <form on:submit={submit}>
    <label> Nome:
      <input placeholder= 'Nome do ingresso' bind:value={ticket.name} required />
    </label>

    <label class='row'> Permitir meia:
      <input type='checkbox' bind:checked={ticket.allow_half} />
    </label>

    <button type='submit' disabled={l_submitting}> {l_submitting ? '...' : 'Enviar'} </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'

  import { navigate } from '../utils/navigation.js'
  import { api } from '../utils/api.js'

  export let data, event_id, show, rendered_ticket
  let l_submitting

  let ticket = {
    name:       data?.name,
    allow_half: data?.allow_half
  }

  function close() { show = false }

  async function submit(e) {
    e.preventDefault()

    l_submitting = true
    if (!data) {
      const { data } = await api(`ticket/${event_id}`, 'POST', ticket)

      return navigate(`/ingresso/${data.id}`)
    }
    await api(`edit-ticket/${data.id}`, 'PUT', ticket)
    rendered_ticket = { ...rendered_ticket, ...ticket }

    close()
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
