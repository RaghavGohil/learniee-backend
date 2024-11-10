const { Timestamp } = require('bson')
const mongoose = require('mongoose')

const Message = new mongoose.Schema({
    sender: String, // username of the sender
    reciever: String, // username of the reciever
    content: String,
    timestamp: Timestamp,
})

module.exports = mongoose.model('message',MessageSchema,'messages')
