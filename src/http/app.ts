import { createEvent } from './routes/create-event'
import { createTicket } from './routes/create-ticket'
import { createBatches } from './routes/create-batches'
import { editEvent } from './routes/edit-event'
import { editTicket } from './routes/edit-ticket'
import { editBatch } from './routes/edit-batch'
import { getEvent } from './routes/get-event'
import { getEventTickets } from './routes/get-event-tickets'
import { getTicket } from './routes/get-ticket'
import { getTicketBatches } from './routes/get-ticket-batches'
import { activeBatch } from './routes/active-batch'
import { getBatch } from './routes/get-batch'
import { removeEvent } from './routes/remove-event'
import { removeTicket } from './routes/remove-ticket'
import { removeBatch } from './routes/remove-batch'

import { BadRequestError, NotFoundError } from './errors'
import { ZodError } from 'zod'
import { env } from '../env'
import fastify from 'fastify'

export const app = fastify()

app.register(createEvent)
app.register(createTicket)
app.register(createBatches)
app.register(editEvent)
app.register(editTicket)
app.register(editBatch)
app.register(getEvent)
app.register(getEventTickets)
app.register(getTicket)
app.register(getTicketBatches)
app.register(activeBatch)
app.register(getBatch)
app.register(removeEvent)
app.register(removeTicket)
app.register(removeBatch)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError)
    return reply.status(400).send({ message: 'Validation error.', issues: error.issues })

  if (error instanceof BadRequestError)
    return reply.status(400).send({ message: error.message })

  if (error instanceof NotFoundError)
    return reply.status(404).send({ message: error.message })

  if (env.NODE_ENV !== 'production')
    console.log(error)

  return reply.status(500).send({ message: 'Internal server error.' })
})
