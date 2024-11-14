require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')

const loginRoutes = require('./routes/loginRoutes.js')
const signupRoutes = require('./routes/signupRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')

// conection
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server)

app.use(cors({
    origin: process.env.FRONTEND_URL, 
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI,{}).then(()=>console.log('Connected to MongoDB.'))
  .catch(err=>console.log(err))

// route management
app.use('/',loginRoutes)
app.use('/',signupRoutes)
app.use('/',chatRoutes)

// socket management
require('./socket.js')(io);

// start server
const PORT = process.env.PORT || 5000 
server.listen(PORT,()=>{
    console.log(`Listening on port: ${PORT}.`)
})
