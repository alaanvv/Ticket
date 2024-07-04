import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app, load_routes } from '../app'
import request from 'supertest'

describe('Ticket Instance API', _ => {
  let batch_id: string, ticket_instance_id: string

  beforeAll(async _ => {
    await load_routes()
    await app.ready()

    const event_id = (await request(app.server).post('/events').set('Authorization', 'Bearer test').send({
      name: 'Exposição',
      local: 'Parque de Exposição',
      address: 'Rua A, Centro, n°57',
      latitude: -20.9116472,
      longitude: -44.076647,
      date: new Date(Number(new Date()) + 1e3)
    })).body.id

    const ticket_id = (await request(app.server).post(`/ticket/${event_id}`).set('Authorization', 'Bearer test').send({
      name: 'Pista',
      allow_half: 0,
      batches: [
        { price_in_cents: 20000, amount: 1 },
      ]
    })).body.id

    batch_id = (await request(app.server).get(`/ticket-batches/${ticket_id}`)).body.batches[0].id
  })
  afterAll(async  _ => await app.close())

  describe('POST /ticket-instance/:id', _ => {
    it('should be able to create a ticket instance', async _ => {
      const res = await request(app.server).post(`/ticket-instance/${batch_id}`).send({
        price_in_cents: 15e3,
        is_half: true
      })

      expect(res.statusCode).toEqual(201)
      expect(res.body).toEqual(expect.objectContaining({ id: expect.any(String) }))
      ticket_instance_id = res.body.id
    })
  })

  describe('GET /ticket-instance/:id', _ => {
    it('should be able to get a ticket instance', async _ => {
      const res = await request(app.server).get(`/ticket-instance/${ticket_instance_id}`).send()

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.objectContaining({
        ticket_instance: expect.any(Object),
        ticket: expect.any(Object),
        event: expect.any(Object)
      }))
    })
  })

  describe('PUT /validate-ticket-instance/:id', _ => {
    it('should be able to validate a ticket instance', async _ => {
      const res = await request(app.server).put(`/validate-ticket-instance/${ticket_instance_id}`).set('Authorization', 'Bearer test').send()

      expect(res.statusCode).toEqual(204)
    })

    it('shouldn\'t be able to validate a ticket instance twice', async _ => {
      const res = await request(app.server).put(`/validate-ticket-instance/${ticket_instance_id}`).set('Authorization', 'Bearer test').send()

      expect(res.statusCode).toEqual(400)
    })
  })

  describe('PUT /undo-validation/:id', _ => {
    it('should be able to undo a validation', async _ => {
      const res = await request(app.server).put(`/undo-validation/${ticket_instance_id}`).set('Authorization', 'Bearer test').send()

      expect(res.statusCode).toEqual(204)
    })
  })
})
