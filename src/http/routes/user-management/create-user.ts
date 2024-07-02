import { ForbiddenError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { get_auth } from '../../utils/auth'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/user', async (req, res) => {
    if (await get_auth(req) != 'admin') throw new ForbiddenError('No privileges.')

    const bodySchema = z.object({
      name:     z.string(),
      password: z.string(),
      role:     z.enum(['admin', 'portaria'])
    })
    const data = bodySchema.parse(req.body)

    const user = await prisma.user.create({ data })

    return res.status(201).send({ id: user.id })
  })
}
