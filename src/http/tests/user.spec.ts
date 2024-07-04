import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { app, load_routes } from '../app'

describe('Event and Ticket API', _ => {
  let user_id: string, session_id: string

  beforeAll(async _ => {
    await load_routes()
    await app.ready()
  })
  afterAll(async  _ => await app.close())

  describe('POST /user', _ => {
    it('should be able to create an user', async _ => {
      const res = await request(app.server).post('/user').set('Authorization', 'Bearer test').send({
        name: 'alaanvv',
        password: 'admin123',
        role: 'admin'
      })

      expect(res.statusCode).toEqual(201)
      expect(res.body).toEqual(expect.objectContaining({ id: expect.any(String) }))
      user_id = res.body.id
    })
  })

  describe('POST /login', _ => {
    it('should be able to login', async _ => {
      const res = await request(app.server).post('/login').send({
        name: 'alaanvv',
        password: 'admin123',
      })

      expect(res.statusCode).toEqual(200)
      expect(res.body).toEqual(expect.objectContaining({ role: expect.any(String) }))
      session_id = res.body.session_id
    })

    it('shouldn\'t be able to login with invalid password', async _ => {
      const res = await request(app.server).post('/login').send({
        name: 'alaanvv',
        password: 'admin321',
      })

      expect(res.statusCode).toEqual(400)
    })
  })

  describe('PUT /edit-user/:id', _ => {
    it('should be able to edit an user', async _ => {
      const res = await request(app.server).put(`/edit-user/${user_id}`).set('Authorization', 'Bearer test').send({
        name: 'alan vale',
        password: 'portaria123',
        role: 'portaria'
      })

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('GET /all-users', _ => {
    it('should get all users', async _ => {
      const res = await request(app.server).get('/all-users').set('Authorization', 'Bearer test')

      expect(res.statusCode).toEqual(200)
      expect(res.body.users).toEqual(expect.any(Array))
    })
  })

  describe('DELETE /session/:id', _ => {
    it('should delete a session by id', async _ => {
      const res = await request(app.server).delete(`/session/${session_id}`).set('Authorization', 'Bearer test')

      expect(res.statusCode).toEqual(204)
    })
  })

  describe('DELETE /user/:id', _ => {
    it('should delete an user by id', async _ => {
      const res = await request(app.server).delete(`/user/${user_id}`).set('Authorization', 'Bearer test')

      expect(res.statusCode).toEqual(204)
    })
  })
})
