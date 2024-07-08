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

export function format_date(date_string) {
  const date = new Date(date_string)
  const now  = new Date()

  const secs_diff = (now - date) / 1e3
  const mins_diff = secs_diff / 60

  if      (secs_diff < 60) return `${parseInt(secs_diff)} segs atrás`
  else if (mins_diff < 60) return `${parseInt(mins_diff)} min${mins_diff > 1 ? 's' : ''} atrás`

  const is_today = date.getDate() == now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear()

  const formatter = new Intl.DateTimeFormat('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day:    '2-digit',
    month:  '2-digit',
    hour:   '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  })
  const parts = formatter.formatToParts(date)

  const day    = parts.find(part => part.type == 'day').value
  const month  = parts.find(part => part.type == 'month').value
  const hour   = parts.find(part => part.type == 'hour').value
  const minute = parts.find(part => part.type == 'minute').value

  return `${!is_today ? `${day}/${month} ` : ''}${hour}:${minute}`
}

