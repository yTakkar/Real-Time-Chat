const chalk  = require('./chalk')
const User   = require('./user')

const register = (req, res) => {
    req.checkBody('username', 'Username is empty').notEmpty();

    req.checkBody('email', 'Email is empty').notEmpty();
    req.checkBody('email', 'Email is invalid').isEmail();
    
    req.checkBody('password', 'Password field is empty').notEmpty();
    req.checkBody('password', 'Passwords don\'t match').equals(req.body.password_again);
    
    let errors = req.validationErrors()
    if(errors){
        let array = []
        for(let elem of errors) {
            array.push(elem.msg)
        }
        res.json({ mssg: array })
    } else {

        User
            .count({ username: req.body.username })
            .then((username) => {
                if(username === 1){
                     res.json({ mssg: ["Username already exists!"] })
                } else {
                    return User.count({ email: req.body.email })
                }
            })
            .then((email) => {
                if(email === 1){
                     res.json({ mssg: ["Email already exists!"] })
                 }
                 let newUser = new User.model({
                    username: req.body.username,
                    email:    req.body.email,
                    password: req.body.password
                })
                 return User.createUser(newUser)
            }) 
            .then((user) => { 
                if(user == "success"){
                    res.json({ mssg: ["You are now registered and can login"], success: true })
                }
            })
            .catch((err) => {
                console.log(chalk.error(err))
            })

    }
}

const login = (req, res) => {
    req.checkBody('username', 'Username is empty').notEmpty();
    req.checkBody('password', 'Password field is empty').notEmpty();
    
    let errors = req.validationErrors()
    if(errors){
        let array = []
        for(let elem of errors) {
            array.push(elem.msg)
        }
        res.json({ mssg: array })
    } else {

        User
            .findOne({ username: req.body.username })
            .then((find) => {
                if(!find){
                    res.json({ mssg: ['User not found'] })
                } else {
                    return User.comparePassword(req.body.password, find.password)
                }
            })
            .then((same) => {
                if(!same){
                    res.json({ mssg: ['Wrong password'] })
                } else {
                    req.session.username = req.body.username
                    res.json({ mssg: ['Successfully logged in'], success: true })
                }
            })
            .catch((err) => {
                console.log(chalk.error(err))
            })

    }
}

const logout = (req, res) => {
    req.session.username = null
    if(req.session.username == null){
        res.redirect('/user/login')
    }
}

module.exports = {
    register,
    login,
    logout
}