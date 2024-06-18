import { NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function getEventTickets(app: FastifyInstance) {
  app.get('/event-tickets/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const event = await prisma.event.findUnique({ where: { id, active: true } })
    if (!event)
      throw new NotFoundError('Event not found.')

    const tickets = await prisma.ticket.findMany({
      where: { eventId: id, active: true }
    })

    return res.status(200).send({ tickets })
  })
}
