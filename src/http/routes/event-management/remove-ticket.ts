import { deleteTicket } from '../../utils/recursive-deletion'
import { BadRequestError, ForbiddenError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { get_auth } from '../../utils/auth'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/ticket/:id', async (req, res) => {
    if (await get_auth(req) != 'admin') throw new ForbiddenError('No privileges.')

    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    try   { await deleteTicket(id) }
    catch { throw new BadRequestError('Ticket not found.') }

    return res.status(204).send()
  })
}
