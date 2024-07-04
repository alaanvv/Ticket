<div hidden={cam_loaded}> {loading_message} </div>
<canvas {width} {height} class:reading={reading} hidden={!cam_loaded} />

<input class:grn={reading} on:input={update_code} placeholder='Leia o QR ou digite' />
<button class='grn' disabled={!code} on:click={get_ticket_instance}> Validar </button>

{#if validated_data}
  <Modal bind:show={validated_data}>
    <div class:red={validated_data.ticket_instance.validated_at} class='tac'>
      <h2> {validated_data.event.name} </h2> <br>
      <span class='detail b'> {validated_data.ticket.name} - {validated_data.ticket_instance.is_half ? 'Meia' : 'Inteira'} </span> <br>

      {#if validated_data.ticket_instance.is_test} <p class='blu'> INGRESSO TESTE </p> {/if}

      {#if validated_data.ticket_instance.validated_at}
        <p class='red'> JÁ USADO: {format_date(validated_data.ticket_instance.validated_at)} </p>
      {/if}

      {#if !validated_data.ticket_instance.validated_at}
        <button class='grn' on:click={validate}> Confirmar </button>
      {/if}
      <button class='red' on:click={_ => validated_data = undefined}> Cancelar </button>
    </div>
  </Modal>
{/if}

{#if error}
  <Modal bind:show={error}>
    <p class='red'> {error} </p>
  </Modal>
{/if}

<script>
  import Modal from  '../components/Modal.svelte'

  import { draw_square, format_date } from '../utils/misc'
  import { history } from '../store.js'
  import { onMount } from 'svelte'
  import jsQR from 'jsqr'

  let canvas, cam_loaded, width, height, reading, error, code, validated_data
  let loading_message = '🎥 Câmera inacessível, tente recarregar a página'
  let video = document.createElement('video')

  function update_code() {
    code = document.querySelector('input').value
  }

  function tick() {
    if (video.readyState != video.HAVE_ENOUGH_DATA)
      return requestAnimationFrame(tick)

    cam_loaded = true
    height = video.videoHeight
    width  = video.videoWidth
    canvas.drawImage(video, 0, 0, width, height)

    const image_data = canvas.getImageData(0, 0, width, height)
    const read_code = jsQR(image_data.data, width, height, { inversionAttempts: 'dontInvert' })
    reading = Boolean(read_code)

    if (read_code) {
      code = read_code.data
      document.querySelector('input').value = code
      draw_square(canvas, read_code.location.topLeftCorner, read_code.location.topRightCorner, read_code.location.bottomRightCorner, read_code.location.bottomLeftCorner, '#00FF00')
    }

    setTimeout(_ => requestAnimationFrame(tick), 50)
  }

  async function get_ticket_instance() {
    const res = await fetch(`http://192.168.1.106:3333/ticket-instance/${code}`)
    if (!res.ok)
      return error = 'Ingresso não encontrado'
    validated_data = await res.json()
  }

  async function validate() {
    await fetch(`http://192.168.1.106:3333/validate-ticket-instance/${code}`, { method: 'PUT' })

    history.update(curr => [...curr, {
      id:           validated_data.ticket_instance.id,
      event:        validated_data.event.name,
      ticket:       validated_data.ticket.name,
      is_half:      validated_data.ticket_instance.is_half,
      validated_at: new Date().toISOString()
    }])

    validated_data = undefined
  }

  onMount(async _ => {
    canvas = document.querySelector('canvas').getContext('2d')

    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    video.srcObject = stream
    video.setAttribute('playsinline', true)
    video.play()
    requestAnimationFrame(tick)
    loading_message = '⌛ Loading video...'
  })
</script>

<style>
  canvas {
    border: 3px solid var(--gray);
    width: 100%;
  }
  canvas.reading {
    border-color: var(--green);
  }

  input, button {
    width: 100%;
    margin-top: 10px;
    padding: 10px;

    font-size: 1.3em;
    text-align: center;
  }

  .detail {
    font-size: 1.2em;
    margin-top: 10px;
  }
</style>
