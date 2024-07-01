import { NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function getTicketBatches(app: FastifyInstance) {
  app.get('/ticket-batches/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })
    if (!ticket)
      throw new NotFoundError('Ticket not found.')

    const batches = await prisma.batch.findMany({
      where: { ticket_id: id, active: true },
      orderBy: { created_at: 'asc' }
    })

    return res.status(200).send({ batches })
  })
}
