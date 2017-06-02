const LoggedIn = (req, res, next) => {
    if(req.session.username){
        next()
    } else {
        res.redirect('/user/login')
    }
}

const NotLoggedIn = (req, res, next) => {
    if(!req.session.username){
        next()
    } else {
        res.redirect('/user/profile')
    }
}

module.exports = {
    LoggedIn,
    NotLoggedIn
}