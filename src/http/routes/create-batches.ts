import { BadRequestError, NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function createBatches(app: FastifyInstance) {
  app.post('/create-batches/:id', async (req, res) => {
    const bodySchema = z.object({
      batches:   z.object({
        amount:           z.coerce.number().int().min(1),
        priceInCents:     z.coerce.number().int().min(1),
        halfPriceInCents: z.optional(z.coerce.number().int().min(1))
      }).array()
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const { batches } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })
    if (!ticket)
      throw new NotFoundError('Ticket not found.')

    for (let batch of batches)
      if (ticket.allowHalf && !batch.halfPriceInCents)
        throw new BadRequestError('No price set to half.')

    const query = batches.map(b => ({ ...b, ticketId: id }))
    const created_batches = await prisma.batch.createManyAndReturn({ data: query })

    return res.status(201).send(created_batches)
  })
}
