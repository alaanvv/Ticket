import { writable } from 'svelte/store'

export const current_path = writable(window.location.pathname)
