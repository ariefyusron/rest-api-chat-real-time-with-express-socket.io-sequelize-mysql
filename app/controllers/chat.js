const models = require('../models')

//users
exports.index = async (req,res) => {

  const users = await models.User.findAll({
                        where: {
                          id: {[req.Op.notIn]:[req.userData.id]}
                        }
                      })
  res.json(users)
}

//sendChat
exports.send = async (req,res) => {

  req.check('chat','Chat is required').not().isEmpty()

  const errors = req.validationErrors()
  if (errors){
    res.status(400).json(errors)
  } else{
    try{
        const results = await models.Chat.create({
          chat: req.body.chat,
          fromUserId:req.userData.id,
          toUserId:req.params.id
        })
        res.io.emit('chat',{receiver:req.params.id,sender:req.userData.id,results})
        res.json(results)
    } catch(error){
        res.json(error)    
    }
  }

}

//showChat
exports.show = async (req,res) => {
  
  const chat = await models.Chat.findAll({
                      where: {
                        [req.Op.or]: [
                          {
                            fromUserId: req.userData.id,
                            toUserId: req.params.id
                          },{
                            fromUserId: req.params.id,
                            toUserId: req.userData.id
                          }
                        ]
                      }
                    })
  res.json(chat)
}
