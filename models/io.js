const socket_io = require('socket.io')
const io        = socket_io()
const chat = require('../models/chat')
let username, message, online_users = []

io.on('connection', (socket) => {

    online_users.push(socket)
    console.log(`${online_users.length} connections`)

    socket.on('typing', (typing) => {
        io.emit('typing', typing)
    })

    // GET AND SEND MESSAGES
    socket.on('message', (mssg) =>{
        let first = mssg.substr(10)
        username = first.substr(0, first.indexOf("</username>"))
        message = mssg.substr(mssg.indexOf("</username>:")+12)

        let newCon = new chat.model({
            username,
            message
        })

        newCon.save((err) => {
            if(err){ console.log(err) }
        })

        io.emit('message', `${username}:${message}`)
    })

})

module.exports = io