import { BadRequestError, NotFoundError, ForbiddenError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { get_auth } from '../utils/auth'
import { z } from 'zod'

export async function createTicket(app: FastifyInstance) {
  app.post('/ticket/:id', async (req, res) => {
    if (await get_auth(req) != 'admin') throw new ForbiddenError('No privileges.')

    const bodySchema = z.object({
      name:      z.string(),
      allow_half: z.coerce.boolean(),
      batches:   z.optional(z.object({
        amount:           z.coerce.number().int().min(1),
        price_in_cents:     z.coerce.number().int().min(1),
        half_price_in_cents: z.optional(z.coerce.number().int().min(1))
      }).array())
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const { name, allow_half, batches } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    if (!await prisma.event.findUnique({ where: { id, active: true } }))
      throw new NotFoundError('Event not found.')

    if (batches)
      for (let batch of batches)
        if (allow_half && !batch.half_price_in_cents)
          throw new BadRequestError('No price set to half.')

    const ticket = await prisma.ticket.create({
      data: { event_id: id, name, allow_half, batches: { create: batches } }
    })

    return res.status(201).send({ id: ticket.id })
  })
}
