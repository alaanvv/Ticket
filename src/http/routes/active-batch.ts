import { NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function activeBatch(app: FastifyInstance) {
  app.get('/active-batch/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })
    if (!ticket)
      throw new NotFoundError('Ticket not found.')

    const batch = await prisma.batch.findFirst({
      where: { ticketId: id, active: true, amount: { gt: 1 } }
    })

    return res.status(200).send(batch)
  })
}
