<Modal on:close={_ => dispatch('close')}>
    <h2> {editing ? 'Editando' : 'Criando'} um Evento </h2>

    <form on:submit={submitForm}>
      <label> <p> Nome: </p>
        <input placeholder= 'Nome do evento' bind:value={name} required />
      </label>

      <label> <p> Descrição: </p>
        <textarea placeholder='Detalhes do evento' rows=5 bind:value={description} />
      </label>

      <label> <p> Local: </p>
        <input bind:value={local} required />
      </label>

      <label> <p> Endereço: </p>
        <input bind:value={address} required />
      </label>

      <label> <p> Imagem: </p>
        <input bind:value={image} />
        {#if validation_errors.image}
          <p class='error'> {validation_errors.image} </p>
        {/if}
      </label>

      <label> <p> Latitude: </p>
        <input step="1e-20" class='hide-arrows' type="number" bind:value={latitude} required />
        {#if validation_errors.latitude}
          <p class='error'> {validation_errors.latitude} </p>
        {/if}
      </label>

      <label> <p> Longitude: </p>
        <input step="1e-20" class='hide-arrows' type="number" bind:value={longitude} required />
        {#if validation_errors.longitude}
          <p class='error'> {validation_errors.longitude} </p>
        {/if}
      </label>

      <label> <p> Data: </p> <!-- TODO Fix this autofill and also the format -->
        <input type="date" bind:value={date} required />
      </label>

      <button type="submit"> Enviar </button>
    </form>
</Modal>

<script>
  import Modal from './Modal.svelte'
  import { createEventDispatcher } from 'svelte'
  import { current_path } from '../store.js'
  import z from 'zod'

  const dispatch = createEventDispatcher()

  export let editing, data
  let name = data?.name
  let description = data?.description
  let local = data?.local
  let address = data?.address
  let image = data?.image
  let latitude = Number(data?.latitude)
  let longitude = Number(data?.longitude)
  let date = new Date(data?.date)

  let validation_errors = {}

  const schema = z.object({
    name:        z.string(),
    description: z.optional(z.string()),
    local:       z.string(),
    address:     z.string(),
    image:       z.optional(z.string().url('A imagem deve ser um URL')),
    latitude:    z.number().refine(v => Math.abs(v) <= 90, { message: 'Latitude deve estar entre -90 e 90' }),
    longitude:   z.number().refine(v => Math.abs(v) <= 180, { message: 'Longitude deve estar entre -180 e 180' }),
    date:        z.coerce.date().min(new Date())
  })

  async function submitForm(e) {
    e.preventDefault()

    const form_data = { name, description, local, address, image, latitude, longitude }

    let validated_data
    try { validated_data = schema.parse(form_data) }
    catch (error) {
      validation_errors = error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message
        return acc
      }, {})
      return
    }

    if (!editing) {
      const res = await fetch('http://localhost:3333/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated_data)
      })
      const id = (await res.json()).id

      const path = `/evento/${id}`
      window.history.pushState({}, '', path)
      current_path.set(path)
    } else {
      const id = $current_path.split('/').pop()
      await fetch(`http://localhost:3333/edit-event/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(validated_data)
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

  input, input[type=number], textarea {
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

    width: 25%;
    margin: 0;

    text-align: start;
  }

  label input {
    float: left;

    width: 75%;
    margin-top: 6px;
  }

  .error {
    float: none;
    width: 90%;

    color: var(--bg1);
  }
</style>
