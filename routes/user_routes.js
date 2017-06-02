const express = require('express')
const app     = express.Router()
const mw      = require('../models/middlewares')
const User    = require('../models/user')
const login   = require('../models/_login')

app.post('/register', (req, res) => {
    login.register(req, res)
})

app.post('/login', (req, res) => {
    login.login(req, res)
})

app.get('/register', mw.NotLoggedIn, (req, res) => {
    res.render('register', { title: "Register" })
})

app.get('/login', mw.NotLoggedIn, (req, res) => {
    res.render('login', { title: "Login" })
})

app.get('/profile', mw.LoggedIn, (req, res) => {
    res.render('profile', { title: "Profile" })
})

app.get('/logout', mw.LoggedIn, (req, res) => {
    login.logout(req, res)
})

module.exports = app