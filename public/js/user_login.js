const fn = require('./functions')

$(() => {

    $('.register').on('submit', (e) => {
        e.preventDefault()
        let data = {
            username: $('.r_username').val(),
            email: $('.r_email').val(),
            password: $('.r_password').val(),
            password_again: $('.r_password_again').val()
        }
        fn.commonLogin("register", data)
    })

    $('.login').on('submit', (e) => {
        e.preventDefault()
        let data = {
            username: $('.l_username').val(),
            password: $('.l_password').val()
        }
        fn.commonLogin("login", data)
    })

})