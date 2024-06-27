<script>
  import * as z from 'zod'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  let name, description, local, address, image, latitude, longitude

  const schema = z.object({
    name: z.string(),
    description: z.optional(z.string()),
    local: z.string(),
    address: z.string(),
    image: z.string().url('A imagem deve ser um URL'),
    latitude: z.number().refine(v => Math.abs(v) <= 90, { message: 'Latitude deve estar entre -90 e 90' }),
    longitude: z.number().refine(v => Math.abs(v) <= 180, { message: 'Longitude deve estar entre -180 e 180' })
  })

  let validationErrors = {}

  async function submitForm(e) {
    e.preventDefault()

    const form_data = {
      name,
      description,
      local,
      address,
      image,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };

    try {
      const validated_data = schema.parse(form_data)

      const res = await fetch('http://localhost:3333/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(validated_data)
      })

      console.log(res)


      dispatch('close')
    } catch (error) {
      console.log(error)
      if (!error.errors) return
      validationErrors = error.errors.reduce((acc, err) => {
        acc[err.path[0]] = err.message
        return acc
      }, {})
    }
  }

  function background_click(e) {
    if (e.target.classList.contains('modal'))
      dispatch('close')
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="modal" on:click={background_click}>
  <div class="modal-content">
    <h2> Criando um Evento </h2>
    <form on:submit={submitForm}>
      <label> <p>Nome:</p>
        <input placeholder= 'Nome do evento' type="text" bind:value={name} required />
      </label>
      <label> <p>Descrição:</p>
        <textarea placeholder='Detalhes do evento' rows=5 bind:value={description} />
      </label>
      <label> <p>Local:</p>
        <input type="text" bind:value={local} required />
      </label>
      <label> <p>Endereço:</p>
        <input type="text" bind:value={address} required />
      </label>
      <label> <p>Imagem:</p>
        <input type="text" bind:value={image} required />
        {#if validationErrors.image}
          <p class='error'>{validationErrors.image}</p>
        {/if}
      </label>
      <label> <p>Latitude:</p>
        <input class='hide-arrows' type="number" bind:value={latitude} required />
        {#if validationErrors.latitude}
          <p class='error'>{validationErrors.latitude}</p>
        {/if}
      </label>
      <label> <p>Longitude:</p>
        <input class='hide-arrows' type="number" bind:value={longitude} required />
        {#if validationErrors.longitude}
          <p class='error'>{validationErrors.longitude}</p>
        {/if}
      </label>
      <button type="submit">Enviar</button>
    </form>
  </div>
</div>

<style>
  .modal {
    display: block;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);

    display: flex;
    align-items: center;
    justify-content: center;
  }

  .modal-content {
    display: flex;
    flex-direction: column;
    background-color: var(--bg0);
    padding: 20px;
    max-width: 80%;
    width: 400px;
    border-radius: 5px;
    display: flex;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
  }

  input[type=text], input[type=number], textarea {
    width: 100%;
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
    text-align: start;
    margin: 0;
  }

  label input {
    float: left;
    width: 75%;
    margin-top: 6px;
  }

  .error {
    width: 90%;
    color: var(--bg1);
    float: none;
  }

</style>
