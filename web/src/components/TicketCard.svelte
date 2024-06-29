<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='card' on:click={_ => navigate(`/ingresso/${ticket.id}`)} >
  <div class='led' />
  <h3 class='no-overflow'> {ticket.name} </h3>
</div>

<script>
  import { navigate } from '../utils/navigation.js'

  export let ticket
</script>

<style>
  .card {
    display: flex;
    align-items: center;
    gap: 10px;

    width: 150px;
    border: 5px solid var(--bg0_h);
    padding: 10px;
    border-radius: 10px;

    overflow:hidden;
    cursor: pointer;
  }

  .led {
    height: 15px;
    aspect-ratio: 1;
    border-radius: 50%;

    background-color: var(--green);
  }
</style>
