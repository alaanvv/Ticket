import { BadRequestError } from './errors/bad-request-error'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function removeEvent(app: FastifyInstance) {
  app.delete('/remove-event/:id', async (req, res) => {
    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { id } = paramSchema.parse(req.params)

    try {
      await prisma.event.delete({ where: { id } })
    }
    catch {
      throw new BadRequestError('This event doesn\'t exist')
    }

    return res.status(201).send({ id })
  })
}
