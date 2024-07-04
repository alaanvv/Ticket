<div class='row container'>
  <div>
    <div class='row'>
      <p> <b>{data.event}</b> | <b>{data.ticket}</b> - <b>{data.is_half ? 'Meia' : 'Inteira'}</b> </p>
      <p> ({format_date(data.validated_at)}) </p>
    </div>
    <code> {data.id} </code>
  </div>
  <button on:click={undo}> <Icon i='undo' /> </button>
</div>

<script>
  import Icon from './Icon.svelte'

  import { format_date } from '../utils/misc'

  export let data

  async function undo() {
    if (!confirm('Certeza que quer reativar esse ingresso?'))
      return
    // TODO
  }
</script>

<style>
  .container {
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;

    background: var(--bg0_h);
    text-align: start;
  }

  .row {
    box-sizing: border-box;
    display: flex;
    gap: 5px;
    align-items: center;

    width: 100%;
  }

  .row p {
    margin: 0;
  }

  .row button {
    aspect-ratio: 1;
    height: 100%;
    border-radius: 10px;
    margin-left: auto !important;

    color: white;
    background: var(--blue);
  }
</style>
