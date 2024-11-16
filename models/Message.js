const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: 'chat', required: true }, // Chat this message belongs to
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true }, // Sender of the message
    content: { type: String, required: true },
    type: { type: String, enum: ['text', 'image', 'file'], default: 'text' }, // Message type
    createdAt: { type: Date, default: Date.now }, 
})

module.exports = mongoose.model('message',MessageSchema,'messages')
