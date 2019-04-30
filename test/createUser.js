const {
  User
} = require('../db/schema')
const bcrypt = require('bcryptjs')

async function createUser(schood_num) {
  const salt = bcrypt.genSaltSync()
  const hash = bcrypt.hashSync('123456', salt)
  await User.create({
    cellphone: '1234567890',
    password: hash,
    userName: '张三'
  })
}

module.exports = createUser