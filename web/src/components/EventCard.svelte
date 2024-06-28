<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='card' on:click={_ => navigate(`/evento/${event.id}`)} >
  <div class='img-div'> <img src={event.image} alt='Sem imagem'> </div>

  <div class='info'>
    <h3 class='no-overflow'> {event.name} </h3>
    <p  class='no-overflow'>
      {#if event.description} {event.description}
      {:else}                 Sem descrição.
      {/if}
    </p>
  </div>
</div>

<script>
  import { current_path } from '../store.js'

  export let event

  const navigate = path => {
    window.history.pushState({}, '', path)
    current_path.set(path)
  }

</script>

<style>
  .card {
    display: flex;
    flex-direction: column;

    width: 300px;
    border: 5px solid var(--bg0_h);
    border-radius: 10px;

    overflow:hidden;
    cursor: pointer;
  }

  .info {
    padding: 0 20px;
    border-radius: 0 0 20px 20px;

    text-align: start;
  }

  .img-div {
    width: 100%;

    aspect-ratio: 1.9;
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
