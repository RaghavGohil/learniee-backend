const mongoose = require('mongoose')

const ChatSchema = new mongoose.Schema({
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }], // Users in the chat
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }, // Updated when a new message is sent
})

module.exports = mongoose.model('chat',ChatSchema,'chats')
