<div class='card'>
  <img src={event.image} alt='Banner do evento'>

  <div class='info'>
    <h3 class='no-overflow'> {event.name} </h3>
    <p  class='no-overflow'> {event.description} </p>
  </div>
</div>

<script>
  export let event
</script>

<style>
  .card {
    display: flex;
    flex-direction: column;

    max-width: 300px;
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

  img {
    object-fit: cover;
    aspect-ratio: 3;
  }
</style>
