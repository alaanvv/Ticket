import { writable } from 'svelte/store'

const curr_path    = writable(window.location.pathname)
const history      = writable([])
const logged_user  = writable()
const opened_event = writable()

export { curr_path, logged_user, history, opened_event }
