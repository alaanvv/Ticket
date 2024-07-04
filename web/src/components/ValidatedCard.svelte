<div class='row card'>
  <div>
    <div>
      <b> {data.event} </b> | <b> {data.ticket} </b> - <b> {data.is_half ? 'Meia' : 'Inteira'} </b>
      ({format_date(data.validated_at)})
    </div>
    <code> {data.id} </code>
  </div>

  <Button class='blu right' action={undo} i='undo' />
</div>

<script>
  import Button from './Button.svelte'

  import { format_date } from '../utils/misc'
  import { logged_user, history } from '../store.js'

  export let data

  async function undo() {
    if (!confirm('Certeza que quer reativar esse ingresso?'))
      return

    await fetch(`http://192.168.1.106:3333/undo-validation/${data.id}`, {
      method: 'PUT',
      headers: { 'Authorization': `Bearer ${$logged_user.session_id}` }
    })
    history.update(curr => curr.filter(v => v.id != data.id))
  }
</script>

<style>
  .card {
    padding: 10px;
    margin-bottom: 10px;

    background: var(--bg0_h);
    text-align: start;
  }

  .card :global(button) {
    aspect-ratio: 1;
    border-radius: 10px;
  }

  @media screen and (max-width: 768px) {
    .card {
      font-size: 0.8em;
    }
  }
</style>
