import { NotFoundError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.get('/ticket-instance/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const ticket_instance = await prisma.ticketInstance.findUnique({ where: { id } })
    if (!ticket_instance)
      throw new NotFoundError('Ticket instance not found.')

    const ticket = await prisma.ticket.findUnique({ where: { id: ticket_instance.ticket_id } })
    const event  = await prisma.event.findUnique({  where: { id: ticket?.event_id } })

    return res.status(200).send({ ticket_instance, ticket, event })
  })
}
