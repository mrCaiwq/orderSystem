const {
  User
} = require('../../db/schema')

User.sync({
  force: false
})

class UserModel {
  /**
   * 根据手机搜索用户
   * @param cellphone 用户手机
   * @returns {Promise.<*>}
   */
  static async findByCellphone(cellphone) {
    return User.findOne({
      where: {
        cellphone
      }
    })
  }
}

module.exports = UserModel