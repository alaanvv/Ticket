import { BadRequestError } from './errors/bad-request-error.ts'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function addBatches(app: FastifyInstance) {
  app.post('/add-batches/:id', async (req, res) => {
    const bodySchema = z.object({
      batches:   z.object({
        amount:           z.coerce.number().int().min(1),
        priceInCents:     z.coerce.number().int().min(1),
        halfPriceInCents: z.optional(z.coerce.number().int().min(1))
      }).array()
    })

    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { batches } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.param)

    const ticketType = await prisma.ticketType.findUnique({ where: { id: id } })
    if (!ticketType) 
      throw new BadRequestError('This ticket type doesn\'t exist')

    for (let batch of batches)
      if (ticketType.allowHalf && !batch.halfPriceInCents)
        throw new BarRequestError('No price set to half')

    batches.map(batch => { batch.ticketTypeId = id })
    const batch = await prisma.batch.createMany({ data: batches })

    return res.status(201).send({ id: id })
  })
}
