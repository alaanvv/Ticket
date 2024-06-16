import { deleteBatch } from '../../utils/recursive-deletion'
import { BadRequestError } from '../errors'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function removeBatch(app: FastifyInstance) {
  app.delete('/batch/:id', async (req, res) => {
    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { id } = paramSchema.parse(req.params)

    try {
      await deleteBatch(id)
    }
    catch {
      throw new BadRequestError('Batch not found')
    }

    return res.status(204).send()
  })
}
