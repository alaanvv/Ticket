import { FastifyInstance } from 'fastify'
import request from 'supertest'

export async function createEventForTesting(app: FastifyInstance) {
  const createEventResponse = await request(app.server)
    .post('/events')
    .send({
      name: 'Exposição',
      local: 'Parque de Exposição',
      address: 'Rua A, Centro, n°57',
      latitude: -20.9116472,
      longitude: -44.076647,
    })

  const { eventId } = createEventResponse.body

  return {
    eventId,
  }
}
