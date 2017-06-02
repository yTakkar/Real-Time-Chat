const mongoose = require('mongoose')
const bcrypt   = require('bcrypt-nodejs')

const schema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const model = mongoose.model('user', schema)

const count = (query) => {
    return new Promise((resolve, reject) => {
        model.count(query, (err, data) => {
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

const findOne = (query) => {
    return new Promise((resolve, reject) => {
        model.findOne(query, (err, data) => {
            if(err){
                reject(err)
            }
            resolve(data)
        })
    })
}

const encrypt = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null)
}

const createUser = (user) => {
    return new Promise((resolve, reject) => {
        bcrypt.hash(user.password, null, null, (err, hash) => {
            user.password = hash
            user.save((err) => {
                if(err){
                    reject(err)
                }
                resolve('success')
            })
        })
    })
}

const comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, res) => {
            if(err){
                reject(err)
            }
            resolve(res)
        })
    })
}

module.exports = {
    model,
    count,
    findOne,
    encrypt,
    createUser,
    comparePassword
}