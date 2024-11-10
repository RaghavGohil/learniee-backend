const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    users: Array,
    messages: Array,
})

module.exports = mongoose.model('chat',ChatSchema,'chats')
