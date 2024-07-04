import { NotFoundError, ForbiddenError } from '../../errors'
import { get_auth } from '../../utils/auth'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/session/:id', async (req, res) => {
    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    if (await get_auth(req) != 'admin' && id != req.headers['authorization']?.split(' ')[1])
      throw new ForbiddenError('No privileges.')

    const session = await prisma.session.findUnique({ where: { id } })
    if (!session)
      throw new NotFoundError('Session not found.')

    await prisma.session.delete({ where: { id } })

    return res.status(204).send({ id })
  })
}
