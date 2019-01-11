const express = require('express')
const router = express.Router()

const chat = require('../controllers/chat')
const checkAuth = require('../middleware/checkAuth')

router.get('/users',checkAuth,chat.index)
router.post('/send/:id',checkAuth,chat.send)
router.get('/show/:id',checkAuth,chat.show)

module.exports = router