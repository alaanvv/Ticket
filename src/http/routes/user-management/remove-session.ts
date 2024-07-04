import { NotFoundError, ForbiddenError } from '../../errors'
import { get_auth, is_user } from '../../utils/auth'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/session/:id', async (req, res) => {
    if (await get_auth(req) != 'admin' && !(await is_user(req))) throw new ForbiddenError('No privileges.')

    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const session = await prisma.session.findUnique({ where: { id } })
    if (!session)
      throw new NotFoundError('Session not found.')

    await prisma.session.delete({ where: { id } })

    return res.status(204).send({ id })
  })
}
