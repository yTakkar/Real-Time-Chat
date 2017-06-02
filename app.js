require('dotenv').config()

const express    = require('express')
const app        = express()
const http       = require('http').createServer(app)
const logger     = require('morgan')
const hbs        = require('express-handlebars')
const port       = process.env.port || 1115
const bodyParser = require('body-parser')
const validator  = require('express-validator')
const session    = require('client-sessions')
const mongoose   = require('mongoose')
const mainR      = require('./routes/main_routes')
const userR      = require('./routes/user_routes')
const socket_io  = require('./models/io')
const io         = socket_io

io.attach(http)
mongoose.connect(process.env.DB_URI)

app.engine('hbs', hbs({extname: "hbs", defaultLayout: "layout", layoutsDir: __dirname+"/views/layouts/"}))
app.set('view engine', 'hbs')

// app.use(logger('dev'))
app.use(express.static(__dirname+"/public"))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(validator())
app.use(session({
    cookieName: "session",
    secret: "iamaprogrammer",
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}))

app.use((req, res, next) => {
    res.locals.session = req.session
    username = req.session
    next()
})

app.use('/', mainR)
app.use('/user/', userR)

http.listen(port, () => {
    console.log(`App running..`)
})