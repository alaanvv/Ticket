import { curr_path } from '../store.js'

const navigate = path => {
  path = `/s${path}`
  window.history.pushState({}, '', path)
  curr_path.set(path)
}

export { navigate }
