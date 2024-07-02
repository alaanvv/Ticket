import { NotFoundError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/ticket-instance/:id', async (req, res) => {
    const bodySchema =  z.object({
      price_in_cents: z.number(),
      is_half:        z.coerce.boolean()
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body)
    const { id } = paramSchema.parse(req.params)

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })
    if (!ticket)
      throw new NotFoundError('Ticket not found.')

    const ticket_instance = await prisma.ticketInstance.create({ data: { ...data, ticket_id: id } })

    return res.status(201).send({ id: ticket_instance.id })
  })
}
