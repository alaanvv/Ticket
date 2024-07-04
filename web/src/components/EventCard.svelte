<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='card' on:click={enter} >
  <div class='img-div'> <img src={event.image} alt='Sem imagem'> </div>

  <div class='info'>
    <h3 class='oe'> {event.name} </h3>
    <p  class='oe'> {event.description || 'Sem descrição.'} </p>
  </div>
</div>

<script>
  import { navigate } from '../utils/navigation.js'

  export let event

  function enter() { navigate(`/evento/${event.id}`) }
</script>

<style>
  .card {
    width: 300px;
    padding: 0;

    cursor: pointer;
  }

  .info {
    margin-top: 10px;
    padding: 0 20px;
  }

  .img-div {
    aspect-ratio: 1;
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
