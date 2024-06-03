import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../app'

describe('create event (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create event', async () => {
    const response = await request(app.server)
      .post('/events')
      .send({
        name: 'Exposição',
        local: 'Parque de Exposição',
        address: 'Rua A, Centro, n°57',
        latitude: -20.9116472,
        longitude: -44.076647,
      })

    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(expect.objectContaining({ eventId: expect.any(String) }))
  })
})
