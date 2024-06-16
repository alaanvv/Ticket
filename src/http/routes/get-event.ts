import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../errors'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function getEvent(app: FastifyInstance) {

  app.get('/events/:eventId', async (request, reply) => {
    const getEventParamsSchema = z.object({
      eventId: z.string().cuid(),
    })

    const { eventId } = getEventParamsSchema.parse(request.params)

    const event = await prisma.event.findUnique({
      where: { id: eventId, active: true }
    })

    if (!event) {
      throw new NotFoundError('Event not found.')
    }

    return reply.status(200).send({ event })
  })

}
