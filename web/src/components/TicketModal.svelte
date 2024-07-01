<Modal on:close={_ => dispatch('close')}>
  <h2> {data ? 'Editando' : 'Criando'} um Ingresso </h2>

  <form on:submit={submitForm}>
    <label> <p> Nome: </p>
      <input placeholder= 'Nome do ingresso' bind:value={ticket.name} required />
    </label>

    <label class='inline cp'> <p> Permitir meia: </p>
      <input type='checkbox' bind:checked={ticket.allow_half} />
    </label>

    <button type="submit"> Enviar </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'

  import { createEventDispatcher } from 'svelte'
  import { navigate } from '../utils/navigation.js'

  const dispatch = createEventDispatcher()

  export let data = undefined
  export let event_id

  let ticket = {
    name:      data?.name,
    allow_half: data?.allow_half
  }

  async function submitForm(e) {
    e.preventDefault()

    if (!data) {
      const res = await fetch(`http://localhost:3333/ticket/${event_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
      })

      navigate(`/ingresso/${(await res.json()).id}`)
    }
    else {
      const id = data.id
      await fetch(`http://localhost:3333/edit-ticket/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(ticket)
      })

      dispatch('update')
    }
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
</style>
