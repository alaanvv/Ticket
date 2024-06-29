<div class='panel'>
  <button class='back' on:click={_ => navigate('/eventos')}> <Icon i='arrow_back' /> Voltar  </button>
  <button class='edit' on:click={_ => edit_modal = true}>    <Icon i='edit' />       Editar  </button>
  <button class='del'  on:click={delete_event}>              <Icon i='delete' />     Excluir </button>
</div>

{#if event}
  <div class='info'>
    <img src={event.image} alt='Sem imagem'>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class='cachorro fucking-hate-naming-stuff' on:click={_ => details_modal = true}>
      <h2 class='t-w-icon'>
        {event.name}
        <span class='date'> <Icon i='calendar_month' /> {formatted_date} </span>
      </h2>
      <p> {event.description || 'Sem descrição.'} </p>
    </div>

    <div class='local'>
      <p> <b class='t-w-icon'> <Icon i='map' /> Local: </b> </p>
      <p> {event.local} </p>

      <p> <b class='t-w-icon'> <Icon i='location_on' /> Endereço: </b> </p>
      <p> {event.address} </p>

      <p class='t-w-icon'> <Icon i='public' /> <a href={maps_link}> Localização no maps </a> </p>
    </div>
  </div>
{/if}

{#if edit_modal}
  <EventModal data={event} on:close={_ => edit_modal = false} on:update={finish_editing} />
{/if}

{#if details_modal}
  <Modal on:close={_ => details_modal = false}>
    <h2> {event.name} </h2>
    <p class='wrappable'> {event.description} </p>
  </Modal>
{/if}

<script>
  import Icon       from '../components/Icon.svelte'
  import Modal      from '../components/Modal.svelte'
  import EventModal from '../components/EventModal.svelte'

  import { navigate } from '../utils/navigation.js'
  import { curr_path } from '../store.js'
  import { onMount } from 'svelte'

  let event, formatted_date, maps_link
  const id = $curr_path.split('/').pop()

  let edit_modal = false
  let details_modal = false

  $: {
    if (event) {
      formatted_date = (new Date(event.date)).toLocaleDateString('pt-BR')
      maps_link = `https://www.google.com/maps?q=${event.latitude},${event.longitude}`
    }
  }

  async function load_event() {
    let res = await fetch(`http://localhost:3333/events/${id}`)
    event = (await res.json()).event
  }

  async function delete_event() {
    if (!confirm('Certeza que deseja excluir?')) return

    await fetch(`http://localhost:3333/event/${id}`, { method: 'DELETE' })
    navigate('/eventos')
  }

  function finish_editing() {
    edit_modal = false
    load_event()
  }

  onMount(load_event)
</script>

<style>
  .panel {
    display: flex;
    align-items: center;
    gap: 20px;

    width: 100%;
    margin-top: 10px;
  }

  .panel button {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .edit {
    background: var(--blue);
    color: white;
  }

  .cachorro {
    padding: 5px;
    overflow: hidden;

    cursor: pointer;
  }

  .cachorro h2 {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .del {
    background: var(--red);
    color: white;
  }

  .info {
    display: flex;
    gap: 20px;

    max-height: 300px;
    margin-top: 20px;

    text-align: start;
  }

  .info > * {
    max-width: 33%;
  }

  .date {
    display: inline-flex;
    align-items: center;
    gap: 5px;

    padding: 5px 10px;
    border-radius: 20px;

    background: var(--bg0_h);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

    font-size: 0.7em;
  }

  .local {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    gap: 10px;

    padding: 30px;
    margin-left: auto;

    text-align: start;

    background: var(--bg0_h);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    overflow: auto;
  }

  .local p {
    margin: 0;
  }

  img {
    max-height: 300px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

    background: black;

    color: white;
  }
</style>
