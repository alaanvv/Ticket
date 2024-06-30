<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='card' on:click={_ => navigate(`/ingresso/${ticket.id}`)} >
  <div class='led' active={is_active} />
  <h3 class='no-overflow'> {ticket.name} </h3>
</div>

<script>
  import { navigate } from '../utils/navigation.js'
  import { onMount } from 'svelte'

  export let ticket
  let is_active

  onMount(async _ => {
    let res = await fetch(`http://localhost:3333/active-batch/${ticket.id}`)
    is_active = Boolean((await res.json()).batch)
  })
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

  .led[active] {
    background-color: var(--red);
  }
</style>
