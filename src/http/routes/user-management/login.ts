import { FastifyInstance } from 'fastify'
import { BadRequestError } from '../../errors'
import { prisma } from '../../../lib/prisma'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.post('/login', async (req, res) => {
    const bodySchema = z.object({
      name:     z.string(),
      password: z.string()
    })
    const data = bodySchema.parse(req.body)

    const user = await prisma.user.findFirst({ where: { name: data.name, password: data.password } })
    if (!user)
      throw new BadRequestError('Invalid credentials.')

    const session = await prisma.session.create({ data: { user_id: user.id } })

    return res.status(200).send({ session_id: session.id, name: user.name, role: user.role })
  })
}
