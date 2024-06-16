import { BadRequestError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function createBatches(app: FastifyInstance) {
  app.post('/create-batches/:id', async (req, res) => {
    const bodySchema = z.object({
      batches:   z.object({
        ticketId:         z.any().default(0), // lsp fucking this up
        amount:           z.coerce.number().int().min(1),
        priceInCents:     z.coerce.number().int().min(1),
        halfPriceInCents: z.optional(z.coerce.number().int().min(1))
      }).array()
    })

    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { batches: batches_data } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })
    if (!ticket)
      throw new BadRequestError('Ticket not found')

    for (let batch of batches_data)
      if (ticket.allowHalf && !batch.halfPriceInCents)
        throw new BadRequestError('No price set to half.')

    batches_data.map(batch => { batch.ticketId = id })
    const batches = await prisma.batch.createManyAndReturn({ data: batches_data })

    return res.status(201).send(batches)
  })
}
