<div class='panel'>
  <button class='back'   on:click={_ => navigate('/eventos')}> <span class="material-symbols-outlined"> arrow_back </span> Voltar  </button>
  <button class='edit'   on:click={swap_modal}> <span class="material-symbols-outlined"> edit       </span> Editar  </button>
  <button class='delete' on:click={delete_event}> <span class="material-symbols-outlined"> delete     </span> Exlcuir </button>
</div>

{#if event}
  <div class='info'>
    <img src={event.image} alt='Sem imagem'>

    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <div class='cachorro I-fucking-hate-naming-stuff' on:click={_ => { show_details_modal = true }}>
      <h2> {event.name} <span class='date'> {(new Date(event.date)).toLocaleDateString('pt-BR')} </span>  </h2>
      <p> {event.description || 'Sem descrição.'} </p>
    </div>

    <div class='local'>
      <p> <b>Local:</b> <br>    {event.local} </p>
      <p> <b>Endereço:</b> <br> {event.address} </p>
      <a href='https://www.google.com/maps?q={event.latitude},{event.longitude}'> Localização no maps </a>
    </div>
  </div>
{/if}

{#if show_modal}
  <EventModal editing=true data={event} on:close={swap_modal} on:update={update} />
{/if}

{#if show_details_modal}
  <Modal on:close={_ => show_details_modal = false}>
    <h2> {event.name} </h2>
    <p> {event.description} </p>
  </Modal>
{/if}

<script>
  import Modal      from '../components/Modal.svelte'
  import EventModal from '../components/EventModal.svelte'
  import { navigate } from '../utils/navigation.js'
  import { current_path } from '../store.js'
  import { onMount } from 'svelte'

  let event
  const id = $current_path.split('/').pop()

  async function _fetch() {
    let res = await fetch(`http://localhost:3333/events/${id}`)
    event = (await res.json()).event
  }
  onMount(_fetch)

  async function delete_event() {
    if (!confirm('Certeza que deseja excluir?')) return

    await fetch(`http://localhost:3333/event/${id}`, {
      method: 'DELETE'
    })


    navigate('/eventos')
  }

  async function update() {
    swap_modal()
    _fetch()
  }

  let show_modal = false
  let show_details_modal = false
  function swap_modal() { show_modal = !show_modal  }

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
    overflow: hidden;

    cursor: pointer;
  }

  .delete {
    background: var(--red);
    color: white;
  }

  .info {
    display: flex;
    gap: 20px;

    max-height: 250px;
    margin-top: 20px;

    text-align: start;
  }

  .info > * {
    max-width: 33%;
  }

  .date {
    padding: 5px;
    border-radius: 20px;

    background: var(--bg0_h);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

    font-size: 0.7em;
  }

  .local {
    display: flex;
    flex-direction: column;

    padding: 30px;
    margin-left: auto;

    text-align: start;

    background: var(--bg0_h);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);
    overflow: auto;
  }

  img {
    max-height: 250px;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.2);

    background: black;

    color: white;
  }
</style>
