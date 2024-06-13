import { BadRequestError } from './errors/bad-request-error'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function removeBatch(app: FastifyInstance) {
  app.delete('/batch/:id', async (req, res) => {
    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { id } = paramSchema.parse(req.params)

    try {
      await prisma.batch.delete({ where: { id } })
    }
    catch {
      throw new BadRequestError('This batch doesn\'t exist')
    }

    return res.status(201).send({ id })
  })
}
