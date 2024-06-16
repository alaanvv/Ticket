import { BadRequestError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function editTicket(app: FastifyInstance) {
  app.put('/edit-ticket/:id', async (req, res) => {
    const bodySchema = z.object({
      name:      z.optional(z.string()),
      allowHalf: z.optional(z.coerce.boolean())
    })

    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { name, allowHalf } = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)
    if (name === null && allowHalf === null)
      throw new BadRequestError('Sent no data to edit.')

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })
    if (!ticket)
      throw new BadRequestError('Ticket not found')

    await prisma.ticket.update({
      where: { id },
      data: {
        name: name || ticket.name,
        allowHalf: allowHalf || ticket.allowHalf
      }
    })

    if (!ticket.allowHalf && allowHalf) {
      const batchesToUpdate = await prisma.batch.findMany({
        where: { ticketId: id, halfPriceInCents: null }
      })

      for (let batch of batchesToUpdate)
        prisma.batch.update({
          where: { id: batch.id },
          data: {
            halfPriceInCents: Number(batch.priceInCents) * 0.5
          }
        })
    }

    return res.status(204).send()
  })
}
