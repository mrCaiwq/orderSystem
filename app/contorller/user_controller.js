const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const userModel = require('../models/user')
const {
  User
} = require('../../db/schema')
const secret = require('../../config/secret')
const renderResponse = require('../../util/renderJson')

class UserController {
  /**
   * 注册和创建用户  
   * @param ctx
   * @return {Promise<void>}
   */

  static async create(ctx) {
    const user = ctx.request.body

    if (user.userName && user.password && user.cellphone) {
      const exisUser = await User.findOne({
        where: {
          cellphone: user.cellphone
        }
      })
      if (exisUser) {
        // 反馈存在的用户名
        ctx.response.status = 412
        ctx.body = renderResponse.ERROR_412('该用户已存在')
      } else {
        // 加密密码
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSync(user.password, salt)
        user.password = hash
        const addUser = await User.create(user)

        ctx.response.status = 200
        let {
          id,
          userName,
          cellphone,
          token,
        } = addUser
        ctx.body = renderResponse.SUCCESS_200('注册成功', {
          id,
          userName,
          cellphone,
          token,
        })
      }
    } else {
      ctx.response.status = 412
      ctx.body = renderResponse.ERROR_412('参数错误')
    }
  }

  /**
   * 登录
   * @param ctx
   * @returns {Promise.<void>}
   */
  static async login(ctx) {
    const data = ctx.request.body
    // 查询用户
    const user = await userModel.findByCellphone(data.cellphone)
    if (user) {
      if (bcrypt.compareSync(data.password, user.password)) {
        // 用户的token
        const userToken = {
          userName: user.userName,
          id: user.id
        }

        // 签发token
        const token = jwt.sign(userToken, secret.sign, {
          expiresIn: '1h'
        })

        ctx.response.status = 200
        let {
          id,
          userName,
          cellphone
        } = user
        ctx.body = renderResponse.SUCCESS_200('登录成功', {
          id,
          userName,
          cellphone,
          token
        })
      } else {
        ctx.response.status = 412
        ctx.body = renderResponse.ERROR_412('用户名或密码错误')
      }
    }
  }
}

module.exports = UserController