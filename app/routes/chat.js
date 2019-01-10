const express = require('express')
const router = express.Router()

const chat = require('../controllers/chat')

router.post('/sendChat',chat.sendChat)

module.exports = router