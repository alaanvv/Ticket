{#if !$history?.length} Você não validou nenhum ingresso nessa sessão {/if}

{#each $history as validated}
  <ValidatedCard data={validated} />
{/each}

<script>
  import ValidatedCard from '../components/ValidatedCard.svelte'

  import { history } from '../store.js'
</script>
