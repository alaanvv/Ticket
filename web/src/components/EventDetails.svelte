{#if event}
  <div class='info'>
    <div class='img-div'> <img src={event.image} alt='Sem imagem'> </div>

    <div>
      <h2> {event.name} </h2>
      <p> {event.description || 'Sem descrição.'} </p>
    </div>

    <div class='local'>
      <p> {event.local} </p>
      <p> {event.address} </p>
      <!-- svelte-ignore a11y-missing-attribute -->
      <a href='https://www.google.com/maps?q={event.latitude},{event.longitude}'> Veja no maps </a>
    </div>
  </div>
{/if}

<script>
  import { current_path } from '../store.js'
  import { onMount } from 'svelte'

  let event

  onMount(async _ => {
    let res = await fetch(`http://localhost:3333/events/${$current_path.split('/').pop()}`)
    event = (await res.json()).event
  })
</script>

<style>
  .info {
    display: flex;
    gap: 20px;

    margin-top: 20px;
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
