const jwt = require('jsonwebtoken')
const secret_key = process.env.JWT_SECRET

module.exports = (req,res,next) => {
  try{
    const token = req.headers.authorization.split(' ')[1]
    const decoded = jwt.verify(token,secret_key)
    req.userData = decoded
    next()
  } catch(error){
    res.status(400).json({message: 'Auth failed'})
  }
}