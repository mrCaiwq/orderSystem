const server = require('./server')
const request = require('supertest')
const {
  User
} = require('../db/schema')
const bcrypt = require('bcryptjs')

async function login() {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync('123456', salt)
  await User.create({
    cellphone: '1234567891',
    password: hash,
    userName: 'jack'
  })

  return await request(server)
    .post('/api/session/sign_in')
    .send({
      cellphone: '1234567891',
      password: '123456'
    })
}

module.exports = login