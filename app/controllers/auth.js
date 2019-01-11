const bcrypt = require('bcrypt')
const saltRounds = 10
const jwt = require('jsonwebtoken')

const models = require('../models')
const secret_key = process.env.JWT_SECRET

//register
exports.register = (req,res) => {

  req.check('firstName','Firstname is required').not().isEmpty()
  req.check('lastName','Lastname is required').not().isEmpty()
  req.check('username','username is required').not().isEmpty()
  req.check('email','email is not valid').isEmail()
  req.check('password','Password min 8').isLength({min:8}).equals(req.body.confirmPassword).withMessage('Confirm password is different')

  const errors = req.validationErrors()
  if (errors){
    res.status(400).json(errors)
  } else {
    req.body.password = bcrypt.hashSync(req.body.password, saltRounds)
    models.User.create(req.body)
      .then((results) => {
        res.json(results)
      }).catch((next) => {
        res.status(400).json({
          message: next.fields.email? 'email is already':'username is already'
        })
      })
  }

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
        res.json({token:token})
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
        res.json({token:token})
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