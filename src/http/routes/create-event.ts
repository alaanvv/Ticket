import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function createEvent(app: FastifyInstance) {
  app.post('/events', async (req, res) => {
    const bodySchema = z.object({
      name: z.string(),
      description: z.optional(z.string()),
      local:   z.string(),
      address: z.string(),
      image:   z.optional(z.string().url()),
      latitude:  z.coerce.number().refine(v => Math.abs(v) <= 90),
      longitude: z.coerce.number().refine(v => Math.abs(v) <= 180),
      date:      z.coerce.date().min(new Date(new Date().getTime() - (24 * 60 * 60 * 1e3)))
    })
    const data = bodySchema.parse(req.body)

    const event = await prisma.event.create({ data })

    return res.status(201).send({ id: event.id })
  })
}
