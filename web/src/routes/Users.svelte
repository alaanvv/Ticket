<div class='panel'>
  <Button class='grn' action={create_user} i='add' t='Novo Usuário' />
</div>

<div class='flex-list'>
  {#each users || [] as user}
    <UserCard {user} on:update={load_users} />
  {/each}
</div>

{#if m_user}
  <UserModal bind:show={m_user} on:update={load_users} />
{/if}

<script>
  import UserCard  from '../components/UserCard.svelte'
  import UserModal from '../components/UserModal.svelte'
  import Button    from '../components/Button.svelte'

  import { onMount } from 'svelte'
  import { api } from '../utils/api.js'

  let users, m_user

  function create_user() { m_user = true }

  async function load_users() {
    const { data } = await api(`all-users`)
    users = data.users
  }

  onMount(load_users)
</script>
