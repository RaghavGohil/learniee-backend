require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const socket = require('socket.io')

const loginRoutes = require('./routes/loginRoutes.js')
const signupRoutes = require('./routes/signupRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')

// conection
const app = express()
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI,{}).then(()=>console.log('Connected to MongoDB.'))
  .catch(err=>console.log(err))

// route management
app.use('/',loginRoutes)
app.use('/',signupRoutes)
app.use('/',chatRoutes)

// start server
const PORT = process.env.PORT || 5000 
app.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}.`)
})
