import { NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function getTicket(app: FastifyInstance) {
  app.get('/ticket/:id', async (req, res) => {
    const paramsSchema = z.object({
      id: z.string().cuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })

    if (!ticket)
      throw new NotFoundError('Ticket not found.')

    return res.status(200).send({ ticket })
  })
}
