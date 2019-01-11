const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET

const models = require('../models')

//register
exports.register = (req,res) => {

    models.User.create(req.body)
      .then((results) => {
        res.json(results)
      }).catch((next) => {
        res.status(400).json({
          message: next.fields.email? 'email is already':'username is already'
        })
      })

}

//login
exports.login = (req,res) => {
  
  req.check('username').isEmail()

  const errors = req.validationErrors()
  if (errors){
    models.User.findOne({
      where:{
        username:req.body.username
      }
    }).then((result) => {
      const compare = bcrypt.compareSync(req.body.password, result.password)
      if (compare){
        const token = jwt.sign({id:result.id,username:result.username,email:result.email},secret_key)
        res.json({userData:result,token:token})
      } else {
        res.status(400).json({message: 'Password not valid'})
      }
    }).catch(() => {
      res.status(400).json({
        message: 'Username not yet registered'
      })
    })
  } else {
    models.User.findOne({
      where:{
        email:req.body.username
      }
    }).then((result) => {
      const compare = bcrypt.compareSync(req.body.password, result.password)
      if (compare){
        const token = jwt.sign({id:result.id,username:result.username,email:result.email},secret_key)
        res.json({userData:result,token:token})
      } else{
        res.status(400).json({message: 'Password not valid'})
      }
    }).catch(() => {
      res.status(400).json({
        message: 'Email not yet registered'
      })
    })
  }

}