import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function deleteBatch(id: string) {
  await prisma.batch.update({
    where: { id, active: true },
    data: { active: false }
  })
}

async function deleteTicket(id: string) {
  await prisma.ticket.update({
    where: { id, active: true },
    data: { active: false }
  })

  const batches = await prisma.batch.findMany({
    where: { ticketId: id, active: true }
  })

  for (let batch of batches)
    await deleteBatch(batch.id)
}

async function deleteEvent(id: string) {
  await prisma.event.update({
    where: { id, active: true },
    data: { active: false }
  })

  const tickets = await prisma.ticket.findMany({
    where: { eventId: id, active: true }
  })

  for (let ticket of tickets)
    await deleteTicket(ticket.id)
}

export { deleteBatch, deleteEvent, deleteTicket }
