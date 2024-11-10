const express = require('express')
const router = express.Router()
const {createUserController} = require('../controllers/userController.js')

router.post('/api/signup',createUserController)

module.exports = router 
