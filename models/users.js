const User = require('../lib/mongo').User

module.exports = {
  // 注册一个用户
  insert(user) {
    return User.insert(user).exec()
  },

  // 通过用户名获取用户信息
  getUserByName(name) {
    return User
      .findOne({ name: name })
      .addCreatedAt()
      .exec()
  }
}
