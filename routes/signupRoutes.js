const express = require('express')
const router = express.Router()
const {createUserController} = require('../controllers/userController.js')

router.post('/api/auth/signup',createUserController)

module.exports = router 
