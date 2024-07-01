import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function createUser(app: FastifyInstance) {
  app.post('/user', async (req, res) => {
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
