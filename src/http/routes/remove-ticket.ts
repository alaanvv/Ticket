import { deleteTicket } from '../../utils/recursive-deletion'
import { BadRequestError } from '../errors'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function removeTicket(app: FastifyInstance) {
  app.delete('/ticket/:id', async (req, res) => {
    const paramSchema = z.object({
      id: z.string().cuid()
    })

    const { id } = paramSchema.parse(req.params)

    try {
      await deleteTicket(id)
    }
    catch {
      throw new BadRequestError('Ticket not found')
    }

    return res.status(204).send()
  })
}
