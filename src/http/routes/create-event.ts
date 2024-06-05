import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { prisma } from '../../lib/prisma'

export async function createEvent(app: FastifyInstance) {

  app.post('/events', async (request, reply) => {
    const createEventBodySchema = z.object({
      name: z.string(),
      description: z.string().optional(),
      local: z.string(),
      address: z.string(),
      latitude: z.coerce.number().refine((value) => Math.abs(value) <= 90),
      longitude: z.coerce.number().refine((value) => Math.abs(value) <= 180),
    })
  
    const { name, description, local, address, latitude, longitude } = createEventBodySchema.parse(request.body)

    const event = await prisma.event.create({
      data: {
        name,
        description,
        local,
        address,
        latitude,
        longitude,
      },
    })

    return reply.status(201).send({ eventId: event.id })
  })

}
