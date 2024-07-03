export function copy_to_clipboard(text) {
  if (navigator.clipboard && window.isSecureContext)
    return navigator.clipboard.writeText(text)

  const text_area = document.createElement('textarea')
  text_area.value = text
  text_area.style.display = 'absolute'
  text_area.style.left = '-999999px'

  document.body.prepend(text_area)
  text_area.select()
  document.execCommand('copy')
  text_area.remove()
}

export function draw_square(canvas, p1, p2, p3, p4, color) {
  function draw_line(begin, end) {
    canvas.beginPath()
    canvas.moveTo(begin.x, begin.y)
    canvas.lineTo(end.x, end.y)
    canvas.lineWidth = 4
    canvas.strokeStyle = color
    canvas.stroke()
  }

  draw_line(p1, p2)
  draw_line(p2, p3)
  draw_line(p3, p4)
  draw_line(p4, p1)
}
