import { NotFoundError, BadRequestError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/ticket-instance/:id', async (req, res) => {
    const bodySchema =  z.object({
      price_in_cents: z.number(),
      is_half:        z.coerce.boolean(),
      is_test:        z.optional(z.coerce.boolean())
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    const batch = await prisma.batch.findUnique({ where: { id, active: true } })
    if (!batch)
      throw new NotFoundError('Batch not found.')

    if (!data.is_test) {
      try {
        await prisma.batch.update({ where: { id, amount: { gt: 0 } }, data: { amount: { decrement: 1 } } })
      }
      catch (_) { throw new BadRequestError('No more tickets on stock.') }
    }

    const ticket_instance = await prisma.ticketInstance.create({ data: { ...data, batch_id: id } })

    return res.status(201).send({ id: ticket_instance.id })
  })
}
