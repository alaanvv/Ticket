import { NotFoundError } from './errors/not-found-error'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function getEventTickets(app: FastifyInstance) {
  app.get('/event-tickets/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().cuid()
    })

    const { id } = paramsSchema.parse(req.params)

    const event = await prisma.event.findUnique({ where: { id, active: true } })

    if (!event)
      throw new NotFoundError('Event not found')

    const tickets = await prisma.ticket.findMany({
      where: { eventId: id, active: true }
    })

    return res.status(200).send(tickets)
  })
}
