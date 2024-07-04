<form class='tas' on:submit={submit}>
  {#if error} <p class='red'> {error} </p> {/if}

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

  <button type='submit'> Entrar </button>
</form>

<script>
  import Icon from  '../components/Icon.svelte'

  import { logged_user } from '../store.js'
  import { onMount } from 'svelte'

  let user = { name: '', password: '' }
  let error, show_password

  function toggle_show_password() { show_password = !show_password }

  async function submit(e) {
    e.preventDefault()
    error = ''

    const res = await fetch(`http://192.168.1.106:3333/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    })
    const data = await res.json()

    if (res.ok) {
      localStorage.setItem('session_id', data.session_id)
      return logged_user.set(data)
    }

    error = 'Credenciais inválidas'
    user.name = ''
    user.password = ''
  }

  onMount(async _ => {
    const session_id = localStorage.getItem('session_id')
    if (!session_id) return

    const res = await fetch(`http://192.168.1.106:3333/session-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: session_id })
    })
    const data = await res.json()

    if (res.ok)
      logged_user.set({ ...data, session_id })
  })
</script>

<style>
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

  form {
    max-width: 300px;
    margin: 0 auto;
  }

  input, button {
    width: 100% !important;
    margin: 10px 0;

    resize: none;
  }
</style>
