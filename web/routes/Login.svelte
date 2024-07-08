{#if not_logged}
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

    <button type='submit' disabled={l_submitting}> {l_submitting ? '...' : 'Entrar'} </button>
  </form>
{:else} Logando...
{/if}

<script>
  import Icon from  '../components/Icon.svelte'

  import { logged_user } from '../store.js'
  import { api } from '../utils/api.js'
  import { onMount } from 'svelte'

  let user = { name: '', password: '' }
  let error, show_password, not_logged
  let l_submitting

  function toggle_show_password() { show_password = !show_password }

  async function submit(e) {
    e.preventDefault()

    error = ''
    l_submitting = true
    const { res, data } = await api('login', 'POST', user)
    l_submitting = false

    if (res.ok) {
      localStorage.setItem('session_id', data.session_id)
      return logged_user.set(data)
    }

    user.name = ''
    user.password = ''
    error = 'Credenciais inválidas'
  }

  onMount(async _ => {
    const session_id = localStorage.getItem('session_id')
    if (!session_id) return not_logged = true

    const { res, data } = await api('session-login', 'POST', { id: session_id })
    if (res.ok) logged_user.set({ ...data, session_id })
    else not_logged = true
  })
</script>

<style>
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
