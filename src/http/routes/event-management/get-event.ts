import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../../errors'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.get('/events/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const event = await prisma.event.findUnique({ where: { id, active: true } })
    if (!event)
      throw new NotFoundError('Event not found.')

    const tickets = await prisma.ticket.findMany({ where: { event_id: id, active: true } })

    for (let i in tickets) {
      const batches = await prisma.batch.findMany({ where: { ticket_id: tickets[i].id, active: true } })
      ;(tickets[i] as any).batches = batches
    }

    return res.status(200).send({ event, tickets })
  })
}
