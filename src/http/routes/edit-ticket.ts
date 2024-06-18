import { BadRequestError, NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function editTicket(app: FastifyInstance) {
  app.put('/edit-ticket/:id', async (req, res) => {
    const bodySchema = z.object({
      name:      z.optional(z.string()),
      allowHalf: z.optional(z.coerce.boolean())
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body) as { [key: string]: any }
    const { id } = paramSchema.parse(req.params)


    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })
    if (!ticket)
      throw new NotFoundError('Ticket not found.')

    await prisma.ticket.update({ where: { id }, data })

    if (!ticket.allowHalf && data.allowHalf) {
      const batchesToUpdate = await prisma.batch.findMany({
        where: { ticketId: id, halfPriceInCents: null }
      })

      for (let batch of batchesToUpdate)
        prisma.batch.update({
          where: { id: batch.id },
          data: { halfPriceInCents: Number(batch.priceInCents) * 0.5 }
        })
    }

    return res.status(204).send()
  })
}
