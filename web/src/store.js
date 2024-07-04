import { writable } from 'svelte/store'

const curr_path = writable(window.location.pathname)
const logged_user = writable()
const history = writable([])

export { curr_path, logged_user, history }
