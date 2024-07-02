import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'

export default async function(app: FastifyInstance) {
  app.get('/all-events', async (_, res) => {
    const events = await prisma.event.findMany({ where: { active: true } })

    return res.status(200).send({ events })
  })
}
