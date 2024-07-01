import { BadRequestError, NotFoundError } from '../errors'
import { FastifyInstance } from 'fastify'
import { prisma } from '../../lib/prisma'
import { z } from 'zod'

export async function editUser(app: FastifyInstance) {
  app.put('/edit-user/:id', async (req, res) => {
    const bodySchema = z.object({
      name:     z.optional(z.string()),
      password: z.optional(z.string()),
      role:     z.optional(z.enum(['admin', 'portaria']))
    })
    const paramSchema = z.object({ id: z.string().cuid() })

    const data = bodySchema.parse(req.body) as { [key: string]: any }
    const { id } = paramSchema.parse(req.params)

    for (let entry of Object.entries(data))
      if (entry[1] === null)
        delete data[entry[0]]

    if (!Object.entries(data).length)
      throw new BadRequestError('Sent no data.')

    const user = await prisma.user.findUnique({ where: { id } })
    if (!user)
      throw new NotFoundError('User not found.')
    if (!user.editable)
      throw new BadRequestError('No privileges.')

    await prisma.user.update({ where: { id }, data })

    return res.status(204).send()
  })
}
