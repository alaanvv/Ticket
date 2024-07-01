<!-- svelte-ignore a11y-click-events-have-key-events -->
<span on:click={_ => dispatch('click')} class='material-symbols-outlined'> {i} </span>

<script>

  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let i
</script>
