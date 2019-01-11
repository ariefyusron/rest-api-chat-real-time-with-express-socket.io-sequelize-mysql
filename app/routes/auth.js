const express = require('express')
const router = express.Router()

const auth = require('../controllers/auth')
const middleware = require('../middlewares/auth')

router.post('/register',middleware.register,auth.register)
router.post('/login',auth.login)

module.exports = router