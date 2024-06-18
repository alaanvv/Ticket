import { FastifyInstance } from 'fastify'
import { NotFoundError } from '../errors'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function getBatch(app: FastifyInstance) {
  app.get('/batch/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid()  })
    const { id } = paramSchema.parse(req.params)

    const batch = await prisma.batch.findUnique({ where: { id, active: true } })
    if (!batch)
      throw new NotFoundError('Batch not found.')

    return res.status(200).send({ batch })
  })
}
