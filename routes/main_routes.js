const express = require('express')
const app     = express.Router()
const mw      = require('../models/middlewares')
const chat    = require('../models/chat')

app.get('/', (req, res) => {
    res.render('index', { title: "NodeJS Real-Time Chat" })
})

app.get('/chat', mw.LoggedIn, (req, res) => {

    chat.model.find({}, (err, data) => {
        if(err){ console.log(err) }
        res.render('chat', { title: "Chat", chats: data })
    })

})

module.exports = app