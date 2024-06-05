import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../app'

describe('create ticket type (e2e)', () => {
  beforeAll(async () => await app.ready())
  afterAll(async () =>  await app.close())

  it('should be able to create a ticket type', async () => {
    const res = await request(app.server).post('/ticket-type').send({
      name: 'Pista',
      allowHalf: 0,
      batches: [
        { priceInCents: 20e3, amount: 200 }, 
        { priceInCents: 30e3, amount: 100 }
      ]
    })

  await request(app.server).post('/ticket-type').send({
      name: 'Pista',
      allowHalf: 0,
      batches: [
        { priceInCents: 20e3, amount: 200 }, 
        { priceInCents: 30e3, amount: 100 }
      ]
    })


    expect(res.statusCode).toEqual(201)
    expect(res.body).toEqual(expect.objectContaining({ id: expect.any(String) }))
  })

  it('shouldn\'t be able to create a ticket type allowing half but not sending it', async () => {
    const res = await request(app.server).post('/ticket-type').send({
      name: 'Pista',
      allowHalf: 1,
      batches: [
        { priceInCents: 20e3, amount: 200 }, 
        { priceInCents: 30e3, amount: 100 }
      ]
    })

    expect(res.statusCode).toEqual(400)
  })
})
