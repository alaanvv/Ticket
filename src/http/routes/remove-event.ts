import { deleteEvent } from '../../utils/recursive-deletion'
import { BadRequestError } from '../errors'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'

export async function removeEvent(app: FastifyInstance) {
  app.delete('/event/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    try   { await deleteEvent(id) }
    catch { throw new BadRequestError('Event not found.') }

    return res.status(204).send({ id })
  })
}
