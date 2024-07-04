import { NotFoundError, ForbiddenError, BadRequestError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { get_auth } from '../../utils/auth'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/undo-validation/:id', async (req, res) => {
    if (!['admin', 'portaria'].includes(await get_auth(req) || ''))
      throw new ForbiddenError('No privileges.')

    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const ticket_instance = await prisma.ticketInstance.findUnique({ where: { id } })
    if (!ticket_instance)
      throw new NotFoundError('Ticket instance not found.')

    if (!ticket_instance.validated_at)
      throw new BadRequestError('Ticket is already valid.')

    await prisma.ticketInstance.update({ where: { id }, data: { validated_at: null } })

    return res.status(204).send()
  })
}
