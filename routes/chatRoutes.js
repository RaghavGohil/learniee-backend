const express = require('express')
const { getUserController } = require('../controllers/userController')
const router = express.Router()

router.get('/api/users',getUserController)

module.exports = router 
