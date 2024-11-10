const express = require('express')
const { loginUserController } = require('../controllers/loginController')
const router = express.Router()

router.post('/api/auth/login',loginUserController)

module.exports = router 
