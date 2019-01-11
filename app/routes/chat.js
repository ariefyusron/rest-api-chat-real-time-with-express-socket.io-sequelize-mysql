const express = require('express')
const router = express.Router()

const chat = require('../controllers/chat')
const middleware = require('../middlewares/auth')

router.get('/users',middleware.checkAuth,chat.index)
router.post('/send/:id',middleware.checkAuth,chat.send)
router.get('/show/:id',middleware.checkAuth,chat.show)

module.exports = router