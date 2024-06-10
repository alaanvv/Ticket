import { BadRequestError } from './errors/bad-request-error'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function editTicketType(app: FastifyInstance) {
  app.post('/edit-ticket-type/:id', async (req, res) => {
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
      throw new BadRequestError('Sent no data to edit')

    const ticketType = await prisma.ticketType.findUnique({ where: { id } })
    if (!ticketType)
      throw new BadRequestError('This ticket type doesn\'t exist')

    prisma.ticketType.update({
      where: { id },
      data: {
        name: name || ticketType.name,
        allowHalf: allowHalf || ticketType.allowHalf
      }
    })

    if (!ticketType.allowHalf && allowHalf) {
      const batchesToUpdate = await prisma.batch.findMany({
        where: { ticketTypeId: id, halfPriceInCents: null }
      })

      for (let batch of batchesToUpdate)
        prisma.batch.update({
          where: { id: batch.id },
          data: {
            halfPriceInCents: Number(batch.priceInCents) * 0.5
          }
        })
    }

    return res.status(201).send({ id })
  })
}
