<Button class='grn' action={create_user} i='add' t='Novo Usuário' />

<div class='flex-list'>
  {#each users || [] as user}
    <UserCard bind:users {user} />
  {/each}
</div>

{#if !users} Carregando... {/if}

{#if m_user}
  <UserModal bind:users bind:show={m_user} />
{/if}

<script>
  import UserModal from '../components/UserModal.svelte'
  import UserCard  from '../components/UserCard.svelte'
  import Button    from '../components/Button.svelte'

  import { api } from '../utils/api.js'
  import { onMount } from 'svelte'

  let users, m_user

  function create_user() { m_user = true }

  onMount(async _ => {
    users = (await api(`all-users`)).data.users
  })
</script>
