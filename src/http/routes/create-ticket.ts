import { BadRequestError } from './errors/bad-request-error'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function createTicket(app: FastifyInstance) {
  app.post('/ticket/:id', async (req, res) => {
    const bodySchema = z.object({
      name:      z.string(),
      allowHalf: z.coerce.boolean(),
      batches:   z.object({
        amount:           z.coerce.number().int().min(1),
        priceInCents:     z.coerce.number().int().min(1),
        halfPriceInCents: z.optional(z.coerce.number().int().min(1))
      }).array()
    })

    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { name, allowHalf, batches } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    if (!await prisma.event.findUnique({ where: { id, active: true } }))
      throw new BadRequestError('This event doesn\'t exist')

    for (let batch of batches)
      if (allowHalf && !batch.halfPriceInCents)
        throw new BadRequestError('No price set to half')

    const ticket = await prisma.ticket.create({
      data: { eventId: id, name, allowHalf, batches: { create: batches } }
    })

    return res.status(201).send({ id: ticket.id })
  })
}
