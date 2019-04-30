const db = require('../db/schema')

async function truncate() {
  return Promise.all(
    [db.sequelize.sync({
      force: true
    })]
  )
}

module.exports = truncate