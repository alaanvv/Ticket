<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class='row card cp' on:click={enter} >
  <div class='led' class:loading class:active />
  <h3> {ticket.name} </h3>
</div>

<script>
  import { navigate } from '../utils/navigation.js'
  import { api } from '../utils/api.js'
  import { onMount } from 'svelte'

  export let ticket
  let active, loading = true

  function enter() { navigate(`/ingresso/${ticket.id}`) }

  onMount(async _ => {
    const { data } = await api(`active-batch/${ticket.id}`)
    active = data.batch
    loading = false
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
  .led.active  { background-color: var(--green); }
  .led.loading { background-color: rgba(0, 0, 0, 0); }
</style>
