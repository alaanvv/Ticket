import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'

export default async function(app: FastifyInstance) {
  app.get('/all-users', async (_, res) => {
    const users = await prisma.user.findMany({ orderBy: { created_at: 'asc' } })

    return res.status(200).send({ users })
  })
}
