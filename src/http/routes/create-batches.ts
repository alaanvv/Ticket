import { BadRequestError, NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function createBatches(app: FastifyInstance) {
  app.post('/create-batches/:id', async (req, res) => {
    const bodySchema = z.object({
      batches:   z.object({
        amount:           z.coerce.number().int().min(0),
        price_in_cents:     z.coerce.number().int().min(1),
        half_price_in_cents: z.optional(z.number().int().min(1))
      }).array()
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const { batches } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })
    if (!ticket)
      throw new NotFoundError('Ticket not found.')

    for (let batch of batches) {
      if (ticket.allow_half && !batch.half_price_in_cents)
        throw new BadRequestError('No price set to half.')

      if (!batch.half_price_in_cents)
        batch.half_price_in_cents = batch.price_in_cents * 0.5
    }

    const query = batches.map(b => ({ ...b, ticket_id: id }))
    const batch_ids = (await prisma.batch.createManyAndReturn({ data: query })).map(b => b.id)

    return res.status(201).send({ ids: batch_ids })
  })
}
