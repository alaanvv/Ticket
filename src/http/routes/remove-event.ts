import { deleteEvent } from '../utils/recursive-deletion'
import { BadRequestError, ForbiddenError } from '../errors'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../utils/auth'
import { z } from 'zod'

export async function removeEvent(app: FastifyInstance) {
  app.delete('/event/:id', async (req, res) => {
    if (await get_auth(req) != 'admin') throw new ForbiddenError('No privileges.')

    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    try   { await deleteEvent(id) }
    catch { throw new BadRequestError('Event not found.') }

    return res.status(204).send({ id })
  })
}
