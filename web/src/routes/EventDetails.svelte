<div class='panel'>
  <button class='back'   on:click={_ => navigate('/eventos')}> <span class="material-symbols-outlined"> arrow_back </span> Voltar  </button>
  <button class='edit'   on:click={swap_modal}> <span class="material-symbols-outlined"> edit       </span> Editar  </button>
  <button class='delete' on:click={delete_event}> <span class="material-symbols-outlined"> delete     </span> Exlcuir </button>
</div>

{#if event}
  <div class='info'>
    <div class='img-div'> <img src={event.image} alt='Sem imagem'> </div>

    <div>
      <h2> {event.name} </h2>
      <p> {event.description || 'Sem descrição.'} </p>
    </div>

    <div class='local'>
      <p> Local: {event.local} </p>
      <p> Endereço: {event.address} </p>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a href='https://www.google.com/maps?q={event.latitude},{event.longitude}'> Veja no maps </a>
    </div>
  </div>
{/if}

{#if show_modal}
  <EventModal editing=true data={event} on:close={swap_modal} on:update={update} />
{/if}

<script>
  import EventModal from '../components/EventModal.svelte'
  import { current_path } from '../store.js'
  import { onMount } from 'svelte'

  const navigate = path => {
    window.history.pushState({}, '', path)
    current_path.set(path)
  }

  let event

  async function _fetch() {
    let res = await fetch(`http://localhost:3333/events/${$current_path.split('/').pop()}`)
    event = (await res.json()).event
  }
  onMount(_fetch)

  async function delete_event() {
    if (!confirm('Certeza que deseja excluir?')) return

    console.log($current_path.split('/').pop())
    await fetch(`http://localhost:3333/event/${$current_path.split('/').pop()}`, {
      method: 'DELETE'
    })


    navigate('/eventos')
  }

  async function update() {
    swap_modal()
    _fetch()
  }

  let show_modal = false
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

  .delete {
    background: var(--red);
    color: white;
  }

  .info {
    display: flex;
    gap: 20px;

    margin-top: 20px;

    text-align: start;
  }

  .info > * {
    max-width: 33%;
  }

  .local {
    margin-left: auto;
    text-align: start;
  }

  .img-div {
    border: 2px solid var(--gray);

    overflow: hidden;
    background: black;
    color: white;
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
</style>
