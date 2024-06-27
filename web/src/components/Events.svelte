<div class='panel'>
  <input placeholder='Pesquisar' bind:value={search_query}>
  <button on:click={swap_modal}> <span class="material-symbols-outlined"> add </span> Criar </button>
</div>

<div class='cards'>
  {#each filtered_events as event}
    <EventCard {event} />
  {/each}
</div>

{#if show_modal}
  <Modal on:close={swap_modal} />
{/if}

<script>
  import EventCard from './EventCard.svelte'
  import Modal     from './Modal.svelte'

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

  let filtered_events = events
  let search_query = ''

  $: {
    filtered_events = events.filter(e => e.name.toLowerCase().includes(search_query.toLowerCase()))
  }

  let show_modal = false
  function swap_modal() { show_modal = !show_modal  }
</script>

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

    color: var(--fg1);
    font-weight: bold;

    background: var(--green);
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;

    margin-top: 30px;

    overflow: scroll;
  }
</style>
