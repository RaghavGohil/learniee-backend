const express = require('express')
const { getUserController } = require('../controllers/userController')
const { initializeChatController, getMessagesController, sendMessageController} = require('../controllers/chatController')
const router = express.Router()

router.get('/api/users',getUserController)
router.post('/api/chat/initialize',initializeChatController)
router.get('/api/messages/:chatId',getMessagesController)
router.post('/api/messages/send',sendMessageController)

module.exports = router 
