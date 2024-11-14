const express = require('express')
const { loginUserController, verifyUserController } = require('../controllers/loginController')
const router = express.Router()

router.get('/api/auth/verify',verifyUserController)
router.post('/api/auth/login',loginUserController)

module.exports = router 
