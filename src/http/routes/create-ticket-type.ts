import { BadRequestError } from './errors/bad-request-error'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function createTicketType(app: FastifyInstance) {
  app.post('/ticket-type', async (req, res) => {
    const bodySchema = z.object({
      name:      z.string(),
      allowHalf: z.coerce.boolean(),
      batches:   z.object({
        amount:           z.coerce.number().int().min(1),
        priceInCents:     z.coerce.number().int().min(1),
        halfPriceInCents: z.optional(z.coerce.number().int().min(1))
      }).array()
    })

    const { name, allowHalf, batches } = bodySchema.parse(req.body)

    for (let batch of batches)
      if (allowHalf && !batch.halfPriceInCents)
        throw new BadRequestError('No price set to half')

    const ticketType = await prisma.ticketType.create({
      data: { name, allowHalf, batches: { create: batches } }
    })

    return res.status(201).send({ id: ticketType.id })
  })
}
