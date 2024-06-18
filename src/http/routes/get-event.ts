import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../errors'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function getEvent(app: FastifyInstance) {
  app.get('/events/:id', async (request, reply) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(request.params)

    const event = await prisma.event.findUnique({ where: { id, active: true } })
    if (!event)
      throw new NotFoundError('Event not found.')

    return reply.status(200).send({ event })
  })
}
