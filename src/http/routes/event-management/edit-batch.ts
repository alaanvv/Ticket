import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { get_auth } from '../../utils/auth'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/edit-batch/:id', async (req, res) => {
    if (await get_auth(req) != 'admin') throw new ForbiddenError('No privileges.')

    const bodySchema = z.object({
      amount:           z.optional(z.number().min(0)),
      price_in_cents:     z.optional(z.number().min(1)),
      half_price_in_cents: z.optional(z.number().min(1))
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

    if (!batch.half_price_in_cents && !data.half_price_in_cents)
      data.half_price_in_cents = data.price_in_cents * 0.5

    await prisma.batch.update({ where: { id }, data })

    return res.status(204).send()
  })
}
