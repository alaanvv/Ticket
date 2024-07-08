<div class='card'>
  <h3 class='oe'> {user.name} ({role_name[user.role]}) </h3>

  <div class='row'>
    <Button action={show_password} i='visibility' />
    <Button action={edit_user}     i='edit'   class='blu' disabled={!user.editable} />
    <Button action={delete_user}   i='delete' class='red' disabled={!user.editable} />
  </div>
</div>

{#if m_user}
  <UserModal bind:users bind:show={m_user} data={user} />
{/if}

{#if password}
  <Modal bind:show={password}>
    Senha: <b> {password} </b>
  </Modal>
{/if}

<script>
  import UserModal from '../components/UserModal.svelte'
  import Button    from '../components/Button.svelte'
  import Modal     from '../components/Modal.svelte'

  import { api } from '../utils/api.js'

  export let user, users
  let m_user, password

  const role_name = {
    admin:    'Admin',
    portaria: 'Portaria'
  }

  function edit_user()     { m_user = true }
  function show_password() { password = user.password }

  function delete_user() {
    if (!confirm('Certeza que deseja excluir?')) return

    users = users.filter(u => u.id != user.id)
    api(`user/${user.id}`, 'DELETE')
  }
</script>

<style>
  .row {
    justify-content: center;

    margin-top: 20px;
  }
</style>
