<form on:submit={submitForm}>
  {#if error} <p class='error'> {error} </p> {/if}
  <label> <p> Nome: </p>
    <input type='text' bind:value={user.name} required />
  </label>

  <label> <p> Senha: </p>
    <div class='password-container'>
      <input type='password' bind:value={user.password} style='display: {showPassword ? 'none' : 'block'};' />
      <input type='text' bind:value={user.password} style='display: {showPassword ? 'block' : 'none'};' />
      <Icon on:click={togglePasswordVisibility} i={showPassword ? 'visibility_off' : 'visibility'}  />
    </div>
  </label>

  <button type="submit"> Entrar </button>
</form>

<script>
  import Icon from  '../components/Icon.svelte'

  import { logged_user } from '../store.js'
  import { onMount } from 'svelte'

  let user = { name: '', password: '' }
  let error

  onMount(async _ => {
    const session_id = localStorage.getItem('session_id')
    if (!session_id) return

    const res = await fetch(`http://localhost:3333/session-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: session_id })
    })
    const data = await res.json()

    if (res.ok)
      logged_user.set({ ...data, session_id })
  })

  let showPassword = false
  function togglePasswordVisibility() {
    showPassword = !showPassword
  }

  async function submitForm(e) {
    e.preventDefault()
    error = ''

    const res = await fetch(`http://localhost:3333/login`, {
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

    max-width: 300px;
    margin: 0 auto;
  }

  input {
    width: 100% !important;
    margin: 10px 0;

    resize: none;
  }

  label {
    display: flex;
    flex-direction: column;
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

  .error {
    color: var(--red)
  }
</style>
