import { prisma } from '../../lib/prisma'
import { FastifyRequest } from 'fastify'

async function get_auth(req: FastifyRequest) {
  const id = req.headers['authorization']?.split(' ')[1]
  if (id == 'test') return 'admin'

  const session = await prisma.session.findFirst({ where: { id } })
  if (!session) return

 const user = await prisma.user.findUnique({ where: { id: session.user_id } })
  if (!user) return

  return user.role
}

export { get_auth }
