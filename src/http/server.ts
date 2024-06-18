import { env } from '../env'
import { app } from './app'

app.listen(
  { host: env.HOST, port: env.PORT },
  (_, addr) => console.log(`Server running at ${addr}`)
)
