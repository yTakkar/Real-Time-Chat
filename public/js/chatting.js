$(() => {

    let socket = io.connect('http://localhost:1115'),
        form = $('form.chat'),
        input = $('#m'),
        info = $('.noti'),
        online = $('.online'),
        username = info.data('username')

    input.on('keyup', function(e){
        let value = $(this).val()
        if(value != ""){
            socket.emit('typing', `${username} is typing..`)
        } else {
            socket.emit('typing', 'empty')
        }
    })

    socket.on('typing', (typing) => {
        (typing == "empty") ? info.text('') : info.text(typing)
    })

    // EMIT MESSAGES
    form.on('submit', (e) => {
        e.preventDefault()      
        socket.emit('message', `<username>${username}</username>: ${input.val()}`)
        input.val('')
    })

    // GET MESSAGES
    socket.on('message', (msg) => {
      $('#messages').append($('<li>').text(msg))
    })

})