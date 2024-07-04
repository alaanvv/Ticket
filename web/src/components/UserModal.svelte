<Modal on:close={_ => show=false}>
  <h2> {data ? 'Editando' : 'Criando'} um Usuário </h2>

  <form on:submit={submitForm}>
    <label> <p> Nome: </p>
      <input type='text' bind:value={user.name} required />
    </label>

    <label> <p> Senha: </p>
      <div class='password-container'>
        <input type='password' bind:value={user.password} style='display: {show_password ? 'none' : 'block'};' />
        <input type='text' bind:value={user.password} style='display: {show_password ? 'block' : 'none'};' />
        <Icon on:click={togglePasswordVisibility} i={show_password ? 'visibility_off' : 'visibility'}  />
      </div>
    </label>
    <label> <p> Cargo: </p>
      <select bind:value={user.role}>
        <option value='admin'>    Admin    </option>
        <option value='portaria'> Portaria </option>
      </select>
    </label>

    <button type="submit"> Enviar </button>
  </form>
</Modal>

<script>
  import Modal from './Modal.svelte'
  import Icon from  './Icon.svelte'

  import { logged_user } from '../store.js'
  import { createEventDispatcher } from 'svelte'
  const dispatch = createEventDispatcher()

  export let data = undefined
  export let show

  let user = {
    name:     data?.name,
    password: data?.password,
    role:     data?.role
  }

  let show_password = false
  function togglePasswordVisibility() { show_password = !show_password }

  async function submitForm(e) {
    e.preventDefault()

    if (!data) {
      await fetch(`http://192.168.1.106:3333/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify(user)
      })

      dispatch('update')
      show=false
    }
    else {
      await fetch(`http://192.168.1.106:3333/edit-user/${data.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${$logged_user.session_id}` },
        body: JSON.stringify(user)
      })

      dispatch('update')
      show=false
    }
  }
</script>

<style>
  .password-container {
    position: relative;
  }

  :global(.password-container span) {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  input {
    width: 100% !important;

    resize: none;
  }

  label {
    display: flex;
    flex-direction: column;

    margin-top: 10px;
  }

  label p {
    float: left;

    width: 50%;
    margin: 0;

    text-align: start;
  }

  label input {
    float: left;

    width: 75%;
  }

  select {
    margin: 6px 0;
  }
</style>
