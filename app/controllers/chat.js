const models = require('../models')
const Sequelize = require('sequelize')

//users
exports.index = (req,res) => {

  const Op = Sequelize.Op
  models.User.findAll({
    where: {
      id: {[Op.notIn]:[req.userData.id]}
    }
  }).then((results) => {
      res.json(results)
  })

}

//showChat
exports.show = (req,res) => {
  res.json('sendChat')
}

//sendChat
exports.send = (req,res) => {
  res.json('sendChat')
}