<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='row card cp' on:click={enter} >
  <div class='led' class:active />
  <h3> {ticket.name} </h3>
</div>

<script>
  import { navigate } from '../utils/navigation.js'
  import { onMount } from 'svelte'

  export let ticket
  let active

  function enter() { navigate(`/ingresso/${ticket.id}`) }

  onMount(async _ => {
    const res = await fetch(`http://192.168.1.106:3333/active-batch/${ticket.id}`)
    active = (await res.json()).batch
  })
</script>

<style>
  .card {
    padding: 10px;
  }

  .led {
    height: 15px;
    aspect-ratio: 1;
    border-radius: 50%;

    background-color: var(--red);
  }
  .led.active {
    background-color: var(--green);
  }
</style>
