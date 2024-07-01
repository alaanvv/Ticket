import { BadRequestError, NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function removeUser(app: FastifyInstance) {
  app.delete('/user/:id', async (req, res) => {
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
