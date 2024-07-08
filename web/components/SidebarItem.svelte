<!-- svelte-ignore a11y-click-events-have-key-events -->
<li class:active={$curr_path == `/s${path}`} class='row' on:click={enter}> <Icon {i} /> {name} </li>

<script>
  import Icon from './Icon.svelte'

  import { navigate } from '../utils/navigation.js'
  import { curr_path } from '../store.js'

  export let path, name, i

  function enter() { navigate(path) }
</script>
