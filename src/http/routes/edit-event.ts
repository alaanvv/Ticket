import { BadRequestError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function editEvent(app: FastifyInstance) {
  app.put('/edit-event/:id', async (req, res) => {
    const bodySchema = z.object({
      name: z.optional(z.string()),
      description: z.optional(z.string()),
      local: z.optional(z.string()),
      address: z.optional(z.string()),
      latitude: z.optional(z.coerce.number().refine((value) => Math.abs(value) <= 90)),
      longitude: z.optional(z.coerce.number().refine((value) => Math.abs(value) <= 180)),
    })

      const paramSchema = z.object({
        id: z.string().cuid()
      })

      const { name, description, local, address, latitude, longitude } = bodySchema.parse(req.body)
      const { id } = paramSchema.parse(req.params)

      if (name == null && description == null && local == null && address == null && latitude == null && longitude == null)
        throw new BadRequestError('Sent no data to edit.')

      const event = await prisma.event.findUnique({ where: { id, active: true } })
      if (!event)
        throw new BadRequestError('Event not found.')


      await prisma.event.update({
        where: { id },
        data: {
          name: name || event.name,
          description: description || event.description,
          local: local || event.local,
          address: address || event.address,
          latitude: latitude || event.latitude,
          longitude: longitude || event.longitude
        }
      })

      return res.status(204).send()
  })
}
