<div class='panel'>
  <button on:click={_ => user_modal = true}> <span class='material-symbols-outlined'> add </span> Novo Usuário </button>
</div>

<div class='cards'>
  {#each users as user}
    <UserCard {user} on:update={on_update} />
  {/each}
</div>

{#if user_modal}
  <UserModal on:close={_ => user_modal = false} on:update={on_update} />
{/if}

<script>
  import UserCard  from '../components/UserCard.svelte'
  import UserModal from '../components/UserModal.svelte'

  import { onMount } from 'svelte'

  let users = []
  let user_modal

  async function load_users() {
    let res = await fetch('http://192.168.1.106:3333/all-users')
    users = (await res.json()).users
  }

  function on_update() {
    user_modal = false
    load_users()
  }

  onMount(load_users)
</script>

<style>
  .panel {
    display: flex;
    align-items: center;
    gap: 20px;

    width: 100%;
    margin-top: 10px;
  }


  button {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5px;

    color: var(--fg1);
    font-weight: bold;

    background: var(--green);
  }

  .cards {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;

    margin-top: 30px;

    overflow: scroll;
  }
</style>
