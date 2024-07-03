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
