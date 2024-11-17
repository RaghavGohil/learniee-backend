const Message = require('./models/Message.js')

module.exports = (io) => {

    let onlineUsers = new Map()

    io.on('connection',(socket)=>{

        console.log('New client connected:', socket.id)

        socket.emit('onlineUsers', Array.from(onlineUsers.keys()));

        //online status
        socket.on('online', (userId)=>{
            console.log(`User ${userId}, is online`)
            if (!onlineUsers.has(userId)) {
                onlineUsers.set(userId, new Set());
            }
            onlineUsers.get(userId).add(socket.id);
            // Broadcast online status
            socket.broadcast.emit('userOnline', userId);  
        })

        //join the chat room on chatid
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
            for (const [userId, sockets] of onlineUsers.entries()) {
              if (sockets.has(socket.id)) {
                sockets.delete(socket.id);
                if (sockets.size === 0) {
                  onlineUsers.delete(userId);
                  socket.broadcast.emit('userOffline', userId);
                }
                break;
              }
            }
            console.log('A user disconnected:', socket.id);
        })
    })
}
