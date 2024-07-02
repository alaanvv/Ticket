import { BadRequestError, NotFoundError, ForbiddenError } from '../../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../../lib/prisma'
import { get_auth } from '../../utils/auth'
import { z } from 'zod'

export default async function(app: FastifyInstance) {
  app.put('/edit-event/:id', async (req, res) => {
    if (await get_auth(req) != 'admin') throw new ForbiddenError('No privileges.')

    const bodySchema = z.object({
      name: z.optional(z.string()),
      description: z.optional(z.optional(z.string())),
      local:   z.optional(z.string()),
      address: z.optional(z.string()),
      image:   z.optional(z.string().url()),
      latitude:  z.optional(z.coerce.number().refine(v => Math.abs(v) <= 90)),
      longitude: z.optional(z.coerce.number().refine(v => Math.abs(v) <= 180)),
      date:      z.optional(z.coerce.date().min(new Date(new Date().getTime() - (24 * 60 * 60 * 1e3))))
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body) as { [key: string]: any }
    const { id } = paramSchema.parse(req.params)

    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    const event = await prisma.event.findUnique({ where: { id, active: true } })
    if (!event)
      throw new NotFoundError('Event not found.')

    await prisma.event.update({ where: { id }, data })

    return res.status(204).send()
  })
}
