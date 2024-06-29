import { writable } from 'svelte/store'

export const curr_path = writable(window.location.pathname)
