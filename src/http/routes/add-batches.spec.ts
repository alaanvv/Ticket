import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../app'

async function createTicketType(allowHalf: Boolean | Number) { // TODO Move to utils
  return (await request(app.server).post('/ticket-type').send({
    name: 'Pista',
    allowHalf: allowHalf,
    batches: [{ priceInCents: 20e3, halfPriceInCents: 10e3, amount: 200 }]
  })).body.id
}

describe('add batches (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async  () => await app.close())

  it('should be able to add more batches', async () => {
    const ticketTypeId = 0//await createTicketType(0)

    const res = await request(app.server).post('/add-batches').send({
      ticketTypeId,
      batches: [
        { priceInCents: 20e3, amount: 200 },
        { priceInCents: 30e3, amount: 100 }
      ]
    })

    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual(expect.objectContaining({ id: expect.any(String) }))
  })

  it('should fail to add batches to a ticket that allows half without sending it price', async () => {
    const ticketTypeId = await createTicketType(1)

    const res = await request(app.server).post('/add-batches').send({
      ticketTypeId,
      batches: [
        { priceInCents: 20e3, amount: 200 },
        { priceInCents: 30e3, amount: 100 }
      ]
    })

    expect(res.statusCode).toEqual(400)
  })
})
