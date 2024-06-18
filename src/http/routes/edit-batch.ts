import { BadRequestError, NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function editBatch(app: FastifyInstance) {
  app.put('/edit-batch/:id', async (req, res) => {
    const bodySchema = z.object({
      amount:           z.optional(z.number().positive()),
      priceInCents:     z.optional(z.number().positive()),
      halfPriceInCents: z.optional(z.number().positive())
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body) as { [key: string]: any }
    const { id } = paramSchema.parse(req.params)

    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    const batch = await prisma.batch.findUnique({ where: { id, active: true } })
    if (!batch)
      throw new NotFoundError('Batch not found.')

    await prisma.batch.update({ where: { id }, data })

    return res.status(204).send()
  })
}
