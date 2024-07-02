import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { get_auth } from '../../utils/auth'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.delete('/user/:id', async (req, res) => {
    if (await get_auth(req) != 'admin') throw new ForbiddenError('No privileges.')

    const paramSchema = z.object({ id: z.string().cuid() })
    const { id } = paramSchema.parse(req.params)

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user)
      throw new NotFoundError('User not found.')
    if (!user.editable)
      throw new BadRequestError('No privileges.')

    await prisma.user.delete({ where: { id } })

    return res.status(204).send({ id })
  })
}
