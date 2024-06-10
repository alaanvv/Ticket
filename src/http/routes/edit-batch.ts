import { BadRequestError } from './errors/bad-request-error'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function editBatch(app: FastifyInstance) {
  app.post('/edit-batch/:id', async (req, res) => {
    const bodySchema = z.object({
      amount:           z.optional(z.number().positive()),
      priceInCents:     z.optional(z.number().positive()),
      halfPriceInCents: z.optional(z.number().positive())
    })

    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { amount, priceInCents, halfPriceInCents } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    const batch = await prisma.batch.findUnique({ where: { id } })
    if (!batch)
      throw new BadRequestError('This batch doesn\'t exist')

    prisma.batch.update({
      where: { id },
      data: {
        amount:           amount           || batch.amount,
        priceInCents:     priceInCents     || batch.priceInCents,
        halfPriceInCents: halfPriceInCents || batch.halfPriceInCents
      }
    })

    return res.status(201).send({ id })
  })
}
