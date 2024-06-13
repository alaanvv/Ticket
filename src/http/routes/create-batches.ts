import { BadRequestError } from './errors/bad-request-error'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function createBatches(app: FastifyInstance) {
  app.post('/create-batches/:id', async (req, res) => {
    const bodySchema = z.object({
      batches:   z.object({
        ticketId:     z.any().default(0), // lsp fucking this up
        amount:           z.coerce.number().int().min(1),
        priceInCents:     z.coerce.number().int().min(1),
        halfPriceInCents: z.optional(z.coerce.number().int().min(1))
      }).array()
    })

    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { batches } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    const ticket = await prisma.ticket.findUnique({ where: { id: id } })
    if (!ticket)
      throw new BadRequestError('This ticket doesn\'t exist')

    for (let batch of batches)
      if (ticket.allowHalf && !batch.halfPriceInCents)
        throw new BadRequestError('No price set to half')

    batches.map(batch => { batch.ticketId = id })
    await prisma.batch.createMany({ data: batches })

    return res.status(201).send({ id: id })
  })
}
