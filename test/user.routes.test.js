const server = require('./server')
const request = require('supertest')
const db = require('../db/schema')
const truncate = require('./truncate')
const User = db['User']
const login = require('./login')
const createUser = require('./createUser')

// close the server after each test
afterAll(() => {
  return server.close()
})
beforeEach(async () => {
  await truncate()
})

describe('POST /api/session/sign_up', () => {
  test('should respond as expected', async () => {
    const users = await User.findAll()
    expect(users.length).toEqual(0)
    const response = await request(server)
      .post('/api/session/sign_up')
      .send({
        cellphone: '1234567890',
        password: '123456',
        userName: '张三',
      })
    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    return User.findAll().then(datas => {
      expect(datas.length).toEqual(1)
      expect(datas[0].cellphone).toEqual('1234567890')
      expect(datas[0].userName).toEqual('张三')
    })
  })
})

describe('POST /api/session/sign_in', () => {
  test('should respond as expected', async () => {
    await request(server)
      .post('/api/session/sign_up')
      .send({
        cellphone: '1234567890',
        password: '123456',
        userName: '张三'
      })

    const response = await request(server)
      .post('/api/session/sign_in')
      .send({
        cellphone: '1234567890',
        password: '123456'
      })

    expect(response.status).toEqual(200)
    expect(response.type).toEqual('application/json')
    const user = response.body.data
    expect(user.cellphone).toEqual('1234567890')
    expect(user.token).toEqual(user.token)
  })
})