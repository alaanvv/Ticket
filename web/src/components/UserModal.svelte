<Modal on:close={close}>
  <h2> {data ? 'Editando' : 'Criando'} um Usuário </h2>

  <form on:submit={submit}>
    <label> Nome:
      <input type='text' bind:value={user.name} required />
    </label>

    <label> Senha:
      <div class='password-container'>
        <input type='password' bind:value={user.password} style='display: {show_password ? 'none' : 'block'};' />
        <input type='text'     bind:value={user.password} style='display: {show_password ? 'block' : 'none'};' />
        <Icon on:click={toggle_show_password} i={show_password ? 'visibility_off' : 'visibility'}  />
      </div>
    </label>

    <label> Cargo:
      <select bind:value={user.role}>
        <option value='admin'>    Admin    </option>
        <option value='portaria'> Portaria </option>
      </select>
    </label>

    <button type='submit'> Enviar </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'
  import Icon  from './Icon.svelte'

  import { logged_user } from '../store.js'
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  export let data, show
  let show_password

  let user = {
    name:     data?.name,
    password: data?.password,
    role:     data?.role
  }

  function close() { show = false }

  function toggle_show_password() { show_password = !show_password }

  async function submit(e) {
    e.preventDefault()

    if (!data)
      await fetch(`http://192.168.1.106:3333/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify(user)
      })

    else
      await fetch(`http://192.168.1.106:3333/edit-user/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify(user)
      })

    dispatch('update')
    close()
  }
</script>

<style>
  input:not([type='checkbox']), button {
    width: 100% !important;
  }

  label {
    margin: 20px 0;

    text-align: start;
  }
  label:not(.row) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  .password-container {
    position: relative;
  }

  .password-container :global(span) {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }
</style>
