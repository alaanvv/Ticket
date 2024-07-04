<button on:click={action} class='{clazz} t-w-icon' {disabled}>
  {#if i} <Icon {i} /> {/if}
  {t}
</button>

<script>
  import Icon from './Icon.svelte'

  export let i, t, action, disabled
  export {clazz as class}

  let clazz = ''
</script>
