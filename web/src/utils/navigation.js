import { current_path } from '../store.js'

const navigate = path => {
  window.history.pushState({}, '', path)
  current_path.set(path)
}

export { navigate }
