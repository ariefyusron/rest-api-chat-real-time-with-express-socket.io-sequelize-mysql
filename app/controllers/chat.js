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

//sendChat
exports.send = (req,res) => {

  req.check('chat','Chat is required').not().isEmpty()

  const errors = req.validationErrors()
  if (errors){
    res.status(400).json(errors)
  } else{
    models.Chat.create({
      chat: req.body.chat,
      fromUserId:req.userData.id,
      toUserId:req.params.id
    })
      .then((results) => {
        res.json(results)
      })
  }

}

//showChat
exports.show = (req,res) => {
  res.json('sendChat')
}