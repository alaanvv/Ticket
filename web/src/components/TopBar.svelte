<div class='bar row'>
  <h2> iTicket </h2>

  <div class='col'>
    <span class="material-symbols-outlined">person</span>
    <p>Tom Miller</p>
  </div>
</div>

<style>
  * {
    user-select: none;
  }

  .bar {
    padding: 5px 20px;
    background: var(--bg0);
    color: var(--fg0);
    flex-basis: 0;
    box-shadow: 0 0 5px 1px rgba(0, 0, 0, 0.1);
  }

  .col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .col p {
    margin: 5px;
  }

  .row {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
</style>
