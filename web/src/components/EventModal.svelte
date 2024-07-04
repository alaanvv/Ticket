<Modal on:close={close}>
    <h2> {data ? 'Editando' : 'Criando'} um Evento </h2>

    <form on:submit={submit}>
      <label> Nome:
        <input placeholder= 'Nome do evento' bind:value={event.name} required />
      </label>

      <label> Descrição:
        <textarea placeholder='Detalhes do evento' rows=5 bind:value={event.description} />
      </label>

      <label> Local:
        <input bind:value={event.local} required />
      </label>

      <label> Endereço:
        <input bind:value={event.address} required />
      </label>

      <label> Imagem:
        <input bind:value={event.image} />
        {#if errors.image} <p class='error red'> {errors.image} </p> {/if}
      </label>

      <label> Latitude:
        <input step="1e-20" class='hide-arrows' type="number" bind:value={event.latitude} required />
        {#if errors.latitude} <p class='error red'> {errors.latitude} </p> {/if}
      </label>

      <label> Longitude:
        <input step="1e-20" class='hide-arrows' type="number" bind:value={event.longitude} required />
        {#if errors.longitude} <p class='error red'> {errors.longitude} </p> {/if}
      </label>

      <label> Data:
        <input type="date" bind:value={event.date} required />
        {#if errors.date} <p class='error red'> {errors.date} </p> {/if}
      </label>

      <button type="submit"> Enviar </button>
    </form>
</Modal>

<script>
  import Modal from './Modal.svelte'

  import { createEventDispatcher } from 'svelte'
  import { navigate } from '../utils/navigation.js'
  import { logged_user } from '../store.js'
  import z from 'zod'

  const dispatch = createEventDispatcher()

  export let data, show

  let event = {
    name:        data?.name,
    description: data?.description,
    local:       data?.local,
    address:     data?.address,
    image:       data?.image,
    latitude:    Number(data?.latitude),
    longitude:   Number(data?.longitude),
    date:        (data?.date ? new Date(data.date) : new Date()).toISOString().split('T')[0]
  }

  const schema = z.object({
    name:        z.string(),
    description: z.optional(z.string()),
    local:       z.string(),
    address:     z.string(),
    image:       z.optional(z.string().url('A imagem deve ser um URL')),
    latitude:    z.number().refine(v => Math.abs(v) <= 90, { message: 'Latitude deve estar entre -90 e 90' }),
    longitude:   z.number().refine(v => Math.abs(v) <= 180, { message: 'Longitude deve estar entre -180 e 180' }),
    date:        z.coerce.date().min(new Date(new Date().getTime() - (24 * 60 * 60 * 1e3)), { message: 'A data não pode ser anterior a hoje' })
  })

  let errors = {}

  function close() { show = false }

  async function submit(e) {
    e.preventDefault()

    let validated_data
    try { validated_data = schema.parse(event) }
    catch (error) {
      errors = error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message
        return acc
      }, {})
      return
    }

    if (!data) {
      const res = await fetch('http://192.168.1.106:3333/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify(validated_data)
      })

      return navigate(`/evento/${(await res.json()).id}`)
    }

    const id = data.id
    await fetch(`http://192.168.1.106:3333/edit-event/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
      body: JSON.stringify(validated_data)
    })

    dispatch('update')
    close()
  }
</script>

<style>
  input:not([type=checkbox]), input[type=number], textarea, button {
    width: 100% !important;
    resize: none;
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

  .error {
    float: none;
    width: 90%;
    margin: 0;
  }
</style>
