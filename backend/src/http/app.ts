import fastify from 'fastify'
import { env } from '../env'

import { createEvent } from './routes/create-event'
import { getEvent } from './routes/get-event-details'

import { ZodError } from 'zod'
import { BadRequestError } from './routes/errors/bad-request-error'
import { NotFoundError } from './routes/errors/not-found-error'

export const app = fastify()

app.register(createEvent)
app.register(getEvent)

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.issues })
  }

  if (error instanceof BadRequestError) {
    return reply.status(400).send({ message: error.message })
  }

  if (error instanceof NotFoundError) {
    return reply.status(404).send({ message: error.message })
  }

  if (env.NODE_ENV !== 'production') {
    console.log(error)
  } else {
    // Here we should log to an external tool like (DataDog, NewRelic, Sentry)
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
