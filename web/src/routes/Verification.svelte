<p class='desktop-only'> Essa página deve ser usada no celular </p>

<div hidden={cam_loaded}> {loading_message} </div>
<canvas {width} {height} class:reading={reading} hidden={!cam_loaded} />

<input class:reading={reading} on:input={update_code} placeholder='Leia o QR ou digite' />
<button disabled={!code} on:click={validate}> Validar </button>

<script>
  import { draw_square } from '../utils/misc'
  import { onMount } from 'svelte'
  import jsQR from 'jsqr'

  let canvas, cam_loaded, width, height, reading
  let code = ''
  let video = document.createElement('video')
  let loading_message = '🎥 Câmera inacessível, tente recarregar a página'

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

    requestAnimationFrame(tick)
  }

  async function validate() {
    // TODO
  }

  onMount(_ => {
    canvas = document.querySelector('canvas').getContext('2d')

    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } }).then(function(stream) {
      video.srcObject = stream
      video.setAttribute('playsinline', true)
      video.play()
      requestAnimationFrame(tick)
      loading_message = '⌛ Loading video...'
    })
  })
</script>

<style>
  .desktop-only {
    color: var(--bg1);
  }

  canvas {
    border: 4px solid var(--gray);
  }

  input, button {
    width: 100%;
    margin-top: 10px;
    padding: 10px;

    font-size: 1.3em;
    text-align: center;
  }

  canvas.reading {
    border-color: #00FF00;
  }

  input.reading {
    color: #00FF00;
  }

  button {
    background: var(--green);
    color: var(--fg1)
  }
</style>
