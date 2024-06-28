import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app } from './app'

describe('Event and Ticket API', _ => {
  let eventId: string, ticketId: string, batchId: string

  beforeAll(async _ => await app.ready())
  afterAll(async  _ => await app.close())

  describe('POST /events', _ => {
    it('should be able to create an event', async _ => {
      const res = await request(app.server).post('/events').send({
        name: 'Exposição',
        local: 'Parque de Exposição',
        address: 'Rua A, Centro, n°57',
        latitude: -20.9116472,
        longitude: -44.076647
      })

      expect(res.statusCode).toEqual(201)
      expect(res.body).toEqual(expect.objectContaining({ id: expect.any(String) }))
      eventId = res.body.id
    })

    it('should return 400 for invalid data', async _ => {
      const res = await request(app.server).post('/events').send({
        name: '',
        local: '',
        address: '',
        latitude: 'invalid',
        longitude: 'invalid'
      })

      expect(res.statusCode).toEqual(400)
    })
  })

  describe('POST /ticket/:id', _ => {
    it('should be able to create a ticket', async _ => {
      const res = await request(app.server).post(`/ticket/${eventId}`).send({
        name: 'Pista',
        allowHalf: 0,
        batches: [
          { priceInCents: 20000, amount: 200 },
          { priceInCents: 30000, amount: 100 }
        ]
      })

      expect(res.statusCode).toEqual(201)
      expect(res.body).toEqual(expect.objectContaining({ id: expect.any(String) }))
      ticketId = res.body.id
    })
  })

  describe('POST /create-batches/:id', _ => {
    it('should be able to create batches', async _ => {
      const res = await request(app.server).post(`/create-batches/${ticketId}`).send({
        batches: [
          { priceInCents: 20000, amount: 200 },
          { priceInCents: 30000, amount: 100 }
        ]
      })

      expect(res.statusCode).toEqual(201)
      expect(res.body.ids[0]).toEqual(expect.any(String))
      batchId = res.body.ids[0]
    })
  })

  describe('PUT /edit-event/:id', _ => {
    it('should be able to edit an event', async _ => {
      const res = await request(app.server).put(`/edit-event/${eventId}`).send({
        name: 'Exposição',
        local: 'Parque de Exposição',
        address: 'Rua A, Centro, n°57',
        latitude: -20.9116472,
        longitude: -44.076647
      })

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('PUT /edit-batch/:id', _ => {
    it('should be able to edit a batch', async _ => {
      const res = await request(app.server).put(`/edit-batch/${batchId}`).send({
        priceInCents: 50000,
        amount: 100
      })

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('PUT /edit-ticket/:id', _ => {
    it('should be able to edit a ticket', async _ => {
      const res = await request(app.server).put(`/edit-ticket/${ticketId}`).send({
        name: 'Camarote',
        allowHalf: 1
      })

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('GET /events/:id', _ => {
    it('should get an event by id', async _ => {
      const res = await request(app.server).get(`/events/${eventId}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.objectContaining({ event: expect.any(Object) }))
    })

    it('should return 404 for non-existing event', async _ => {
      const res = await request(app.server).get('/events/cjc21k4oq000001qri7hnn5ng')

      expect(res.statusCode).toEqual(404)
    })
  })

  describe('GET /all-events', _ => {
    it('should get all events', async _ => {
      const res = await request(app.server).get('/all-events')

      expect(res.statusCode).toEqual(200)
      expect(res.body.events).toEqual(expect.any(Array))
    })

    it('should return 404 for non-existing event', async _ => {
      const res = await request(app.server).get('/events/cjc21k4oq000001qri7hnn5ng')

      expect(res.statusCode).toEqual(404)
    })
  })

  describe('GET /event-tickets/:id', _ => {
    it('should get tickets for an event by id', async _ => {
      const res = await request(app.server).get(`/event-tickets/${eventId}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body.tickets).toEqual(expect.any(Array))
    })
  })

  describe('GET /ticket/:id', _ => {
    it('should get a ticket by id', async _ => {
      const res = await request(app.server).get(`/ticket/${ticketId}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.any(Object))
    })
  })

  describe('GET /ticket-batches/:id', _ => {
    it('should get batches for a ticket by id', async _ => {
      const res = await request(app.server).get(`/ticket-batches/${ticketId}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body.batches).toEqual(expect.any(Array))
    })
  })

  describe('GET /batch/:id', _ => {
    it('should get a batch by id', async _ => {
      const res = await request(app.server).get(`/batch/${batchId}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.objectContaining({ batch: expect.any(Object) }))
    })
  })

  describe('GET /active-batch/:id', _ => {
    it('should get the active batch for a ticket by id', async _ => {
      const res = await request(app.server).get(`/active-batch/${ticketId}`)

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.any(Object))
    })
  })

  describe('DELETE /batch/:id', _ => {
    it('should delete a batch by id', async _ => {
      const res = await request(app.server).delete(`/batch/${batchId}`)

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('DELETE /ticket/:id', _ => {
    it('should delete a ticket by id', async _ => {
      const res = await request(app.server).delete(`/ticket/${ticketId}`)

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('DELETE /event/:id', _ => {
    it('should delete an event by id', async _ => {
      const res = await request(app.server).delete(`/event/${eventId}`)

      expect(res.statusCode).toEqual(204)
    })
  })
})
