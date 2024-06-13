import request from 'supertest'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { app } from '../app'
import { createEventForTesting } from '../../utils/test/create-event-for-testing'

describe('get event details (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get event details', async () => {
    const { eventId } = await createEventForTesting(app)

    const response = await request(app.server)
      .get(`/events/${eventId}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body.event).toEqual(expect.objectContaining({ id: expect.any(String) }))
  })
})
