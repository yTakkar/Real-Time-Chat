const mongoose = require('mongoose')

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const model = mongoose.model('chat', schema)

module.exports = {
    model
}