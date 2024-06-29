<div class='bar row'>
  <h2> iTicket </h2>

  <div class='col'>
    <Icon i='person' />
    <p> Alan Vale </p>
  </div>
</div>

<script>
  import Icon from '../components/Icon.svelte'
</script>

<style>
  .bar {
    flex-basis: 0;

    margin: 0 0 10px  0;
    padding: 0 20px;

    background: var(--bg0);
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);

    color: var(--fg0);
    user-select: none;
  }

  p {
    margin: 5px;
  }

  .col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
