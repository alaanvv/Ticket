<div class='card'>
  <h3 class='oe'> {user.name} ({role_name[user.role]}) </h3>

  <div class='row'>
    <Button                                       action={show_password} i='visibility' />
    <Button class='blu' disabled={!user.editable} action={edit_user}     i='edit' />
    <Button class='red' disabled={!user.editable} action={delete_user}   i='delete' />
  </div>
</div>

{#if m_user}
  <UserModal bind:show={m_user} on:update={update} data={user} />
{/if}

{#if password}
  <Modal bind:show={password}>
    Senha: <b> {password}   </b> <br>
  </Modal>
{/if}

<script>
  import UserModal from '../components/UserModal.svelte'
  import Button    from '../components/Button.svelte'
  import Modal     from '../components/Modal.svelte'

  import { createEventDispatcher } from 'svelte'
  import { api } from '../utils/api.js'

  const dispatch = createEventDispatcher()

  export let user
  let m_user, password

  const role_name = {
    admin:    'Admin',
    portaria: 'Portaria'
  }

  function edit_user() { m_user = true }
  function show_password() { password = user.password }
  function update() { dispatch('update') }

  async function delete_user() {
    if (!confirm('Certeza que deseja excluir?')) return

    await api(`user/${user.id}`, 'DELETE')
    update()
  }
</script>

<style>
  .row {
    justify-content: center;

    margin-top: 20px;
  }
</style>
