<script>
  export let event
</script>

<div class='card'>
  <img src={event.image} alt='Img'>
  <div class='info'>
    <h3 class='no-overflow'> {event.name} </h3>
    <p class='no-overflow'> {event.description} </p>
  </div>
</div>

<style>
  .card {
    display: flex;
    flex-direction: column;
    max-width: 300px;
    border-radius: 20px;
    cursor: pointer;
    border: 5px solid var(--bg0_h);
    overflow:hidden;
  }

  .info {
    padding: 0 20px;
    border-top: 0;
    border-radius: 0 0 20px 20px;
    text-align: start;
  }

  img {
    aspect-ratio: 3;
    object-fit: cover;
  }

  h3 {
    margin: 15px 0 0 0;
  }
</style>
