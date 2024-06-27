<script>
  import EventCard from './EventCard.svelte'

  let events = [
    {
      name: 'Festa do peão',
      description: 'O evento mais esperado do anooooooooooo!',
      local: 'Parque de Exposições',
      image: './festa.jpg'
    },
    {
      name: 'Ilha da macacada',
      description: 'i want neuron activation!',
      local: 'Parque de Exposições',
      image: 'https://www.meme-arsenal.com/memes/92ce88b0d694ca7b28b12b4b30cd237f.jpg'
    }
  ]

  let displayed_events = events

  let search_query = ''
  $: {
    displayed_events = events.filter(e => e.name.toLowerCase().includes(search_query.toLowerCase()))
  }

  import Modal from './Modal.svelte'
  let showModal = false

  function openModal()  { showModal = true  }
  function closeModal() { showModal = false }
</script>

<h1 class='tabname'>Eventos</h1>
<div class='hr'></div>

<div class='panel'>
  <input placeholder='Pesquisar' bind:value={search_query}>
  <button on:click={openModal}> <span class="material-symbols-outlined">add</span> Criar </button>
</div>

<div class='cards'>
  {#each displayed_events as event}
    <EventCard {event} />
  {/each}
</div>

{#if showModal}
  <Modal on:close={closeModal} />
{/if}

<style>
  .panel {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    width: 100%;
    margin-top: 10px;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    background: var(--green);
    color: var(--fg1);
    font-weight: bold;
  }

  .cards {
    overflow: scroll;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin-top: 30px;
  }
</style>
