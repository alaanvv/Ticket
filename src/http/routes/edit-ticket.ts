import { BadRequestError, NotFoundError, ForbiddenError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { get_auth } from '../utils/auth'
import { z } from 'zod'

export async function editTicket(app: FastifyInstance) {
  app.put('/edit-ticket/:id', async (req, res) => {
    if (await get_auth(req) != 'admin') throw new ForbiddenError('No privileges.')

    const bodySchema = z.object({
      name:      z.optional(z.string()),
      allow_half: z.optional(z.coerce.boolean())
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body) as { [key: string]: any }
    const { id } = paramSchema.parse(req.params)


    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    const ticket = await prisma.ticket.findUnique({ where: { id, active: true } })
    if (!ticket)
      throw new NotFoundError('Ticket not found.')

    await prisma.ticket.update({ where: { id }, data })

    return res.status(204).send()
  })
}
