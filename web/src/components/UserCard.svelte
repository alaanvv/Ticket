<div class='info'>
  <h3 class='no-overflow'> {user.name} </h3>

  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <p class='cp' on:click={toggle_password}> Senha: <b> {resolve_password(user.password, show_password)} </b> </p>
  <p> Cargo: <b> {resolve_role(user.role)}     </b> </p>

  <div class='row'>
    <button class='edit' disabled={!user.editable} on:click={_ => user_modal = true}> <Icon i='edit' /> </button>
    <button class='del'  disabled={!user.editable} on:click={delete_user}> <Icon i='delete' /> </button>
  </div>
</div>

{#if user_modal}
  <UserModal if={user_modal} on:close={_ => user_modal = false} on:update={on_update} data={user} />
{/if}

<script>
  import Icon from '../components/Icon.svelte'
  import UserModal  from '../components/UserModal.svelte'

  import { createEventDispatcher } from 'svelte'
  import { logged_user } from '../store.js'

  const dispatch = createEventDispatcher()

  export let user
  let user_modal = false, show_password

  function resolve_role(role) {
    switch (role) {
      case 'admin':    return 'Administrador'
      case 'portaria': return 'Portaria'
    }
  }

  function resolve_password(password) {
    if (show_password) return password
    return '***'
  }

  function toggle_password() {
    show_password = !show_password
  }

  async function delete_user() {
    if (!confirm('Certeza que deseja excluir?')) return

    await fetch(`http://192.168.1.106:3333/user/${user.id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${$logged_user.session_id}` }
    })
    dispatch('update')
  }

  function on_update() {
    user_modal = false
    dispatch('update')
  }
</script>

<style>
  .info {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    gap: 20px;

    width: 200px;
    padding: 10px;
    border: 5px solid var(--bg0_h);
    border-radius: 10px;
  }

  .info p {
    margin: 0;
  }

  .row {
    display: flex;
    gap: 10px;
  }

  .edit {
    background: var(--blue);
    color: white;
  }

  .del {
    background: var(--red);
    color: white;
  }
</style>
