const Message = require('./models/Message.js')

module.exports = (io) => {

    let users = {}

    io.on('connection',(socket)=>{

        console.log('New client connected:', socket.id)

        // Join specific chat rooms
        socket.on('join_chat', (chatId) => {
          socket.join(chatId)
          console.log(`Socket ${socket.id} joined chat ${chatId}`)
        })

        // Listen for new messages
        socket.on('send_message', async (data) => {
          const { chatId, content, senderId } = data

          // Save message to the database
          const message = new Message({
            chat: chatId,
            sender: senderId,
            content,
          })
          await message.save()

          // Emit message to the chat room
          io.to(chatId).emit('new_message', message)
        })

        socket.on('disconnect', () => {
          console.log('Client disconnected:', socket.id)
        })
    })
}
