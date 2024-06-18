import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function createEvent(app: FastifyInstance) {
  app.post('/events', async (request, reply) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.optional(z.string()),
      local:   z.string(),
      address: z.string(),
      latitude:  z.coerce.number().refine(v => Math.abs(v) <= 90),
      longitude: z.coerce.number().refine(v => Math.abs(v) <= 180)
    })
    const data = bodySchema.parse(request.body)

    const event = await prisma.event.create({ data })

    return reply.status(201).send({ id: event.id })
  })
}
