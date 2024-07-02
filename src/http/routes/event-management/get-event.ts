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

    return res.status(200).send({ event })
  })
}
