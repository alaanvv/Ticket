import { FastifyInstance } from 'fastify'
import { BadRequestError } from '../errors'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function login(app: FastifyInstance) {
  app.post('/login', async (req, res) => {
    const bodySchema = z.object({
      name:     z.string(),
      password: z.string()
    })

    const data = bodySchema.parse(req.body)

    const user = await prisma.user.findFirst({ where: { name: data.name, password: data.password } })
    if (!user)
      throw new BadRequestError('Invalid credentials.')

    return res.status(200).send({ name: user.name, role: user.role })
  })
}
