const { default: mongoose } = require('mongoose');
const Chat = require('../models/Chat.js')
const Message = require('../models/Message.js')

const initializeChatController = async (req, res) => { // find a two person chat or create it if not exist
  const { userId1, userId2 } = req.body

  let chat = await Chat.findOne({
    participants: { $all: [userId1, userId2] },
  })

  if (!chat) {
    chat = new Chat({
      participants: [userId1, userId2],
    })
    await chat.save();
  }

  res.status(200).json(chat);
};

const getMessagesController = async (req, res) => {
  const { chatId } = req.params;

  try {
    // Fetch messages for the given chatId, sorted by creation time
    const messages = await Message.find({ chatId }).sort({ createdAt: 1 });
      console.log(messages)
    res.status(200).json({messages:messages})
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};


const sendMessageController = async (req, res) => {
  const { chatId, senderId, content, type } = req.body
    console.log(req.body)

  const message = new Message({
    chatId: chatId,
    senderId: senderId,
    content: content,
    type,
  })

  await message.save()

  await Chat.findByIdAndUpdate(chatId, { updatedAt: Date.now() })

  // Emit the message to all connected clients
  //req.io.to(chatId).emit('new_message', message) //???

  res.status(201).json(message)
}


module.exports = {
    initializeChatController,
    getMessagesController,
    sendMessageController
}
