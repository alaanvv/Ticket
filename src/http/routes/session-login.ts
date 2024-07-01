import { FastifyInstance } from 'fastify'
import { BadRequestError, NotFoundError } from '../errors'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function sessionLogin(app: FastifyInstance) {
  app.post('/session-login', async (req, res) => {
    const bodySchema = z.object({ id: z.string().cuid() })
    const { id } = bodySchema.parse(req.body)

    const session = await prisma.session.findUnique({ where: { id } })
    if (!session)
      throw new NotFoundError('Session not found.')

    const user = await prisma.user.findFirst({ where: { id: session.user_id } })
    if (!user)
      throw new BadRequestError('Invalid credentials.')

    return res.status(200).send({ name: user.name, role: user.role })
  })
}
