
module.exports = (io) => {

    io.on('connection',(socket)=>{

        socket.join('room-'+roomid) // connect to the specific chat id

        io.sockets.in('room-'+roomid).emit('connectToRoom', "You joined a room") // emit client specific event
        console.log(`User connected to socket server: ${socket.id}`)

        socket.on('message',(msg)=>{ // on message written, brodcast to all clients
            console.log(`got message ${msg}`) 
            io.emit('message',msg)
        })

        socket.on('disconnect',()=>{ 
            console.log('disconnected from caht server')
        })

    })

}
